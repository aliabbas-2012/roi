// @ts-nocheck
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";

const DEFAULT_AUTO_HIDE_MS = 15000;

/**
 * Inline alert with optional auto-dismiss (default 15s).
 * Pass string `message` and Bootstrap `variant`; empty message renders nothing.
 * `onAutoHide` runs after auto-dismiss (or manual dismiss when `dismissible`) — use to clear parent state or URL params.
 */
const FlashAlert = ({
  variant = "info",
  message = "",
  autoHideMs = DEFAULT_AUTO_HIDE_MS,
  onAutoHide,
  className = "",
  dismissible = false,
}) => {
  const text = message != null && String(message).trim() !== "" ? String(message).trim() : "";
  const onAutoHideRef = useRef(onAutoHide);
  onAutoHideRef.current = onAutoHide;

  const [open, setOpen] = useState(Boolean(text));
  const timeoutRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!text) {
      clearTimer();
      setOpen(false);
      return undefined;
    }

    setOpen(true);

    if (!autoHideMs || autoHideMs <= 0) {
      return () => clearTimer();
    }

    clearTimer();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setOpen(false);
      onAutoHideRef.current?.();
    }, autoHideMs);

    return () => clearTimer();
  }, [text, autoHideMs, clearTimer]);

  const handleDismiss = () => {
    clearTimer();
    setOpen(false);
    onAutoHideRef.current?.();
  };

  if (!open || !text) return null;

  return (
    <Alert
      variant={variant}
      className={className}
      dismissible={dismissible}
      onClose={dismissible ? handleDismiss : undefined}
    >
      {text}
    </Alert>
  );
};

export default FlashAlert;
