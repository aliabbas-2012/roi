// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import Button from "./Button";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateUpdateUserFields } from "../utils/validation";

const readHashParams = () => {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  const hash = window.location.hash?.replace(/^#/, "") || "";
  return new URLSearchParams(hash);
};

const AuthUpdateUserForm = ({ loginHref = "/login" }) => {
  const router = useRouter();
  const { updateUser, error: authError } = useAuth();
  const [accessToken, setAccessToken] = useState("");
  const [recoveryType, setRecoveryType] = useState("");
  const [email, setEmail] = useState("");
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
    setEmail(params.get("email") || "");
    setHashReady(true);
  }, []);

  const isRecoveryFlow = recoveryType === "recovery" && Boolean(accessToken);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextErrors = validateUpdateUserFields({ email, password, confirmPassword });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!isRecoveryFlow) {
      setError("Invalid or expired recovery link. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      await updateUser({
        accessToken,
        email: String(email || "").trim(),
        password: String(password || "").trim(),
      });
      router.push(`${loginHref}?passwordUpdated=1`);
    } catch (err) {
      setError(err?.message || authError || "Unable to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {hashReady && !isRecoveryFlow ? (
        <Alert variant="warning">Invalid or expired recovery link. Please request a new password reset email.</Alert>
      ) : null}
      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="user@roi.com"
        isInvalid={Boolean(fieldErrors.email)}
      />
      <FormErrorText message={fieldErrors.email} />

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
        {loading ? "Updating..." : "Update user"}
      </Button>

      <div className="auth-footer-links">
        <Link href={loginHref}>Back to login</Link>
      </div>
    </form>
  );
};

export default AuthUpdateUserForm;
