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

export const loginApi = async ({ email, password, role }) => {
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

  const sessionPayload = buildSessionPayload({
    session: { access_token: accessToken },
    user,
    profile: { role: resolvedRole },
  });
  setSession(sessionPayload);
  return sessionPayload;
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

  let user = signUpData?.user || null;
  let accessToken = signUpData?.access_token || null;

  if (!user) {
    throw new Error("Unable to register.");
  }

  if (accessToken) {
    // Ensure new users continue through standard login screen after signup.
    clearSession();
  }

  return {
    success: true,
    email,
    message: "Account created successfully.",
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

export const updateUserApi = async ({ accessToken, email, password }) => {
  if (!accessToken) {
    throw new Error("Recovery session is missing. Please use the latest recovery link.");
  }

  const updatePayload = {};
  if (String(email || "").trim()) updatePayload.email = String(email || "").trim();
  if (String(password || "").trim()) updatePayload.password = String(password || "").trim();

  if (!Object.keys(updatePayload).length) {
    throw new Error("Provide email or password to update.");
  }

  await authHttpRequest({
    path: "/auth/v1/user",
    method: "PUT",
    accessToken,
    body: updatePayload,
  });

  return {
    success: true,
    message: "Password updated successfully, please login.",
  };
};
