// @ts-nocheck

/**
 * Idle timeout for auto-logout, from env (shared by admin + client apps).
 * `NEXT_PUBLIC_SESSION_IDLE_MINUTES` — positive number = minutes without activity before logout.
 * Missing, empty, NaN, or <= 0 disables idle logout.
 */
export const getSessionIdleTimeoutMs = () => {
  const raw = process.env.NEXT_PUBLIC_SESSION_IDLE_MINUTES;
  if (raw == null || String(raw).trim() === "") return null;
  const minutes = Number(String(raw).trim());
  if (!Number.isFinite(minutes) || minutes <= 0) return null;
  return Math.round(minutes * 60 * 1000);
};
