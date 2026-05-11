// @ts-nocheck
"use client";

import React, { useState } from "react";
import Link from "next/link";
import FlashAlert from "./FlashAlert";
import Input from "./Input";
import Button from "./Button";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateRecoverPasswordFields } from "../utils/validation";

const AuthForgotPasswordForm = ({ emailPlaceholder = "user@roi.com", loginHref = "/login" }) => {
  const { recoverPassword, error: authError } = useAuth();
  const [email, setEmail] = useState(emailPlaceholder);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const nextErrors = validateRecoverPasswordFields({ email });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    let redirectTo = process.env.NEXT_PUBLIC_AUTH_RECOVER_REDIRECT_TO || "";
    if (!redirectTo && typeof window !== "undefined") {
      redirectTo = `${window.location.origin}/update-password`;
    }

    setLoading(true);
    try {
      const response = await recoverPassword({
        email: String(email || "").trim(),
        redirectTo,
      });
      setSuccess(response?.message || "Recovery email sent. Please check your inbox.");
    } catch (err) {
      setError(err?.message || authError || "Unable to send recovery email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FlashAlert variant="success" message={success} onAutoHide={() => setSuccess("")} />
      <FlashAlert variant="danger" message={error} onAutoHide={() => setError("")} />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={emailPlaceholder}
        isInvalid={Boolean(fieldErrors.email)}
      />
      <FormErrorText message={fieldErrors.email} className="mb-3" />
      <Button className="w-100 auth-submit-btn" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>
      <div className="auth-footer-links">
        <Link href={loginHref}>Back to login</Link>
      </div>
    </form>
  );
};

export default AuthForgotPasswordForm;
