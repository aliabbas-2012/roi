// @ts-nocheck
import { clearSession, getSession, setSession } from "../../utils/authSession";

const getAuthApiConfig = () => {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_AUTH_ANON_KEY;
  if (!baseUrl || !apiKey) {
    throw new Error("Missing auth API environment variables (NEXT_PUBLIC_AUTH_API_URL, NEXT_PUBLIC_AUTH_ANON_KEY).");
  }
  return { baseUrl, apiKey };
};

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

/** Normalize error bodies from GoTrue-style and similar auth HTTP APIs. */
const getAuthApiErrorMessage = (payload, response) => {
  const status = response?.status;
  const p = payload && typeof payload === "object" ? payload : null;

  if (p) {
    const fromString = (value) => {
      const s = typeof value === "string" ? value.trim() : "";
      return s || "";
    };

    const desc = fromString(p.error_description);
    if (desc) return desc;

    const msg = fromString(p.msg);
    if (msg) return msg;

    const message = fromString(p.message);
    if (message) return message;

    const hint = fromString(p.hint);
    if (hint) return hint;

    const details = fromString(p.details);
    if (details) return details;

    if (Array.isArray(p.errors) && p.errors.length) {
      const first = p.errors[0];
      const nested =
        typeof first === "string"
          ? first
          : fromString(first?.message) || fromString(first?.msg) || fromString(first?.detail);
      if (nested) return nested;
    }

    const err = p.error;
    if (typeof err === "string" && err.trim()) {
      const code = err.trim();
      if (code === "invalid_grant" || code === "invalid_credentials" || code === "email_not_confirmed") {
        if (code === "email_not_confirmed") {
          return "Please confirm your email before signing in.";
        }
        return "Invalid email or password.";
      }
      return code;
    }

    if (err && typeof err === "object") {
      const nestedMsg = fromString(err.message) || fromString(err.msg);
      if (nestedMsg) return nestedMsg;
    }
  }

  if (status === 401 || status === 400) {
    return "Invalid email or password.";
  }
  if (status === 422) {
    return "The request could not be processed. Check your input and try again.";
  }
  if (status === 429) {
    return "Too many attempts. Please wait and try again.";
  }
  if (status >= 500) {
    return "The auth service is temporarily unavailable. Please try again later.";
  }

  return "Something went wrong. Please try again.";
};

const authHttpRequest = async ({ path, method = "GET", body, accessToken, extraHeaders = {} }) => {
  const { baseUrl, apiKey } = getAuthApiConfig();
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${accessToken || apiKey}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await safeJson(response);
  if (!response.ok) {
    throw new Error(getAuthApiErrorMessage(payload, response));
  }

  return payload;
};

const buildSessionPayload = ({ session, user, profile }) => {
  const fullName =
    `${String(user?.user_metadata?.firstName || "").trim()} ${String(user?.user_metadata?.lastName || "").trim()}`.trim() ||
    `${String(profile?.first_name || "").trim()} ${String(profile?.last_name || "").trim()}`.trim() ||
    user?.email ||
    "User";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    token: session?.access_token || "",
    user: {
      id: user?.id,
      email: user?.email,
      role: user?.user_metadata?.role || profile?.role || "client",
      name: fullName,
      initials: initials || "US",
      countryCode: user?.user_metadata?.countryCode || profile?.country_code || "",
      phoneNumber: user?.user_metadata?.phone || profile?.phone_number || "",
    },
  };
};

export const getAuthSession = async () => {
  return getSession();
};

/**
 * Step 1: password + role check (GoTrue password grant). Does not persist a client session.
 * Ends the short-lived password session server-side so login completes only after email OTP.
 */
export const verifyPasswordForLoginApi = async ({ email, password, role }) => {
  const authData = await authHttpRequest({
    path: "/auth/v1/token?grant_type=password",
    method: "POST",
    body: { email, password },
  });

  const user = authData?.user;
  const accessToken = authData?.access_token;
  if (!user || !accessToken) throw new Error("Unable to login.");

  const resolvedRole = user?.user_metadata?.role || "client";
  if (resolvedRole !== role) {
    throw new Error(`This account is not allowed for ${role} login.`);
  }

  try {
    await authHttpRequest({
      path: "/auth/v1/logout",
      method: "POST",
      accessToken,
    });
  } catch {
    // best-effort: drop password-grant session before OTP completes
  }

  return { email: String(email || "").trim(), role, user };
};

/**
 * Step 2: send email OTP (GoTrue `POST /auth/v1/otp`).
 * Supabase uses the **Magic Link** email template for this call. If the template has no `{{ .Token }}`,
 * users only receive a clickable link — add that variable in Dashboard → Auth → Email templates → Magic Link
 * so the email also contains the numeric code (see project README “Magic Link instead of OTP”).
 */
export const sendLoginEmailOtpApi = async ({ email }) => {
  await authHttpRequest({
    path: "/auth/v1/otp",
    method: "POST",
    body: {
      email: String(email || "").trim(),
      create_user: false,
    },
  });
  return { success: true };
};

/** Step 3: verify email OTP and create the app session (GoTrue verify). */
export const verifyLoginEmailOtpApi = async ({ email, token, role }) => {
  const trimmedEmail = String(email || "").trim();
  const trimmedToken = String(token || "").trim();
  if (!trimmedEmail || !trimmedToken) {
    throw new Error("Enter the code from your email.");
  }

  let authData = null;
  let verifyError = null;
  for (const otpType of ["email", "magiclink"]) {
    try {
      authData = await authHttpRequest({
        path: "/auth/v1/verify",
        method: "POST",
        body: { type: otpType, email: trimmedEmail, token: trimmedToken },
      });
      verifyError = null;
      break;
    } catch (err) {
      verifyError = err;
    }
  }
  if (!authData) throw verifyError || new Error("Invalid or expired code.");

  const user = authData?.user;
  const accessToken = authData?.access_token;
  if (!user || !accessToken) throw new Error("Invalid or expired code.");

  const resolvedRole = user?.user_metadata?.role || "client";
  if (resolvedRole !== role) {
    throw new Error(`This account is not allowed for ${role} login.`);
  }

  const sessionPayload = buildSessionPayload({
    session: { access_token: accessToken },
    user,
    profile: { role: resolvedRole },
  });
  setSession(sessionPayload);
  return sessionPayload;
};

const normalizeSignUpUser = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  if (payload.user && typeof payload.user === "object" && payload.user.id) return payload.user;
  if (payload.id && payload.email) return payload;
  return null;
};

const pickSignUpAccessToken = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  return payload.access_token || payload.session?.access_token || null;
};

const inferNeedsEmailVerification = (user, accessToken) => {
  if (accessToken) return false;
  if (!user?.id) return false;
  if (user.email_confirmed_at) return false;
  if (user.user_metadata?.email_verified === true) return false;
  return true;
};

export const registerClientApi = async ({ firstName, lastName, email, countryCode, phoneNumber, password }) => {
  const firstNameValue = String(firstName || "").trim();
  const lastNameValue = String(lastName || "").trim();
  const phoneValue = String(phoneNumber || "").trim();
  const countryCodeValue = String(countryCode || "").trim();

  const signUpPayload = {
    email,
    password,
    data: {
      firstName: firstNameValue,
      lastName: lastNameValue,
      phone: phoneValue,
      countryCode: countryCodeValue,
      role: "client",
    },
  };

  const signUpData = await authHttpRequest({
    path: "/auth/v1/signup",
    method: "POST",
    body: signUpPayload,
  });

  const user = normalizeSignUpUser(signUpData);
  const accessToken = pickSignUpAccessToken(signUpData);

  if (!user) {
    throw new Error("Unable to register.");
  }

  if (accessToken) {
    // Ensure new users continue through standard login screen after signup.
    clearSession();
  }

  const needsEmailVerification = inferNeedsEmailVerification(user, accessToken);

  return {
    success: true,
    email,
    needsEmailVerification,
    message: needsEmailVerification
      ? "Check your email inbox and confirm your address before signing in."
      : "Account created successfully. You can sign in now.",
  };
};

export const logoutApi = async () => {
  const currentSession = getSession();
  const accessToken = currentSession?.token;
  if (accessToken) {
    await authHttpRequest({
      path: "/auth/v1/logout",
      method: "POST",
      accessToken,
    });
  }
  clearSession();
  return { success: true };
};

export const recoverPasswordApi = async ({ email, redirectTo }) => {
  const resolvedRedirect = redirectTo || process.env.NEXT_PUBLIC_AUTH_RECOVER_REDIRECT_TO;

  const payload = resolvedRedirect ? { email, redirect_to: resolvedRedirect } : { email };

  await authHttpRequest({
    path: "/auth/v1/recover",
    method: "POST",
    body: payload,
  });

  return {
    success: true,
    message: "Recovery email sent. Please check your inbox.",
  };
};

export const updatePasswordFromRecoveryApi = async ({ accessToken, password }) => {
  if (!accessToken) {
    throw new Error("Recovery session is missing. Please use the latest recovery link.");
  }

  const passwordValue = String(password || "").trim();
  if (!passwordValue) {
    throw new Error("Enter a new password.");
  }

  await authHttpRequest({
    path: "/auth/v1/user",
    method: "PUT",
    accessToken,
    body: { password: passwordValue },
  });

  return {
    success: true,
    message: "Password updated successfully, please login.",
  };
};
