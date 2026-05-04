// @ts-nocheck

const SESSION_KEY = "roi_auth_session";

const canUseStorage = () => typeof window !== "undefined";

export const getSession = () => {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setSession = (session) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearSession = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
};
