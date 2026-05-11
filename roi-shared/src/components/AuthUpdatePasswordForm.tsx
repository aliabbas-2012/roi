// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FlashAlert from "./FlashAlert";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import Button from "./Button";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateUpdatePasswordFields } from "../utils/validation";

const readHashParams = () => {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  const hash = window.location.hash?.replace(/^#/, "") || "";
  return new URLSearchParams(hash);
};

const AuthUpdatePasswordForm = ({ loginHref = "/login" }) => {
  const router = useRouter();
  const { updatePasswordFromRecovery, error: authError } = useAuth();
  const [accessToken, setAccessToken] = useState("");
  const [recoveryType, setRecoveryType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hashReady, setHashReady] = useState(false);

  useEffect(() => {
    const params = readHashParams();
    setAccessToken(params.get("access_token") || "");
    setRecoveryType(params.get("type") || "");
    setHashReady(true);
  }, []);

  const isRecoveryFlow = recoveryType === "recovery" && Boolean(accessToken);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextErrors = validateUpdatePasswordFields({ password, confirmPassword });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!isRecoveryFlow) {
      setError("Invalid or expired recovery link. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      await updatePasswordFromRecovery({
        accessToken,
        password: String(password || "").trim(),
      });
      router.push(`${loginHref}?passwordUpdated=1`);
    } catch (err) {
      setError(err?.message || authError || "Unable to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FlashAlert
        variant="warning"
        message={hashReady && !isRecoveryFlow ? "Invalid or expired recovery link. Please request a new password reset email." : ""}
      />
      <FlashAlert variant="danger" message={error} onAutoHide={() => setError("")} />

      <PasswordInput
        label="New password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="********"
        isInvalid={Boolean(fieldErrors.password)}
      />
      <FormErrorText message={fieldErrors.password} />

      <PasswordInput
        label="Confirm password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="********"
        isInvalid={Boolean(fieldErrors.confirmPassword)}
      />
      <FormErrorText message={fieldErrors.confirmPassword} className="mb-3" />

      <Button className="w-100 auth-submit-btn" type="submit" disabled={loading || !hashReady || !isRecoveryFlow}>
        {loading ? "Updating..." : "Update password"}
      </Button>

      <div className="auth-footer-links">
        <Link href={loginHref}>Back to login</Link>
      </div>
    </form>
  );
};

export default AuthUpdatePasswordForm;
