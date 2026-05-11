// @ts-nocheck

export const PENDING_LOGIN_OTP_KEY = "roi_pending_login_otp";

/** Store email + app role between /login and /verify-login-otp (sessionStorage). */
export const setPendingLoginOtp = (payload) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(PENDING_LOGIN_OTP_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode
  }
};

export const getPendingLoginOtp = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_LOGIN_OTP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const clearPendingLoginOtp = () => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(PENDING_LOGIN_OTP_KEY);
  } catch {
    // ignore
  }
};
