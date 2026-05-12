// @ts-nocheck
"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { logoutAction } from "../store/actions";
import { selectIsAuthenticated } from "../store/selectors";
import { getSessionIdleTimeoutMs } from "../utils/sessionIdle";

const ACTIVITY_EVENTS = ["pointerdown", "keydown", "wheel", "scroll", "touchstart", "click"];
const CHECK_INTERVAL_MS = 15000;

/**
 * When the user is authenticated and `NEXT_PUBLIC_SESSION_IDLE_MINUTES` is set to a positive value,
 * logs out and redirects to `loginPath` after that many minutes with no pointer/keyboard/scroll activity.
 */
const AuthIdleWatcher = ({ loginPath = "/login" }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const idleMs = useMemo(() => getSessionIdleTimeoutMs(), []);
  const lastActivityRef = useRef(Date.now());
  const loggingOutRef = useRef(false);

  useEffect(() => {
    if (!idleMs || !isAuthenticated) return undefined;

    loggingOutRef.current = false;
    lastActivityRef.current = Date.now();

    const onActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const onVisibility = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        lastActivityRef.current = Date.now();
      }
    };

    ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, onActivity, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);

    const intervalId = window.setInterval(() => {
      if (!loggingOutRef.current && Date.now() - lastActivityRef.current > idleMs) {
        loggingOutRef.current = true;
        Promise.resolve(dispatch(logoutAction()))
          .catch(() => {})
          .finally(() => {
            router.replace(loginPath);
          });
      }
    }, CHECK_INTERVAL_MS);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(intervalId);
    };
  }, [idleMs, isAuthenticated, dispatch, router, loginPath]);

  return null;
};

export default AuthIdleWatcher;
