// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import FlashAlert from "./FlashAlert";
import Input from "./Input";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateLoginOtpFields } from "../utils/validation";
import { clearPendingLoginOtp, getPendingLoginOtp } from "../utils/pendingLoginOtp";

const AuthVerifyLoginOtpForm = ({ loginHref = "/login", dashboardHref = "/dashboard" }) => {
  const router = useRouter();
  const { loginVerifyOtp, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [token, setToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [missingPending, setMissingPending] = useState(false);

  useEffect(() => {
    const pending = getPendingLoginOtp();
    if (!pending?.email || !pending?.role) {
      setMissingPending(true);
      return;
    }
    setEmail(pending.email);
    setRole(pending.role);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextErrors = validateLoginOtpFields({ token });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (missingPending) return;

    setLoading(true);
    try {
      await loginVerifyOtp({ email, token: String(token || "").trim(), role });
      clearPendingLoginOtp();
      router.push(dashboardHref);
    } catch (err) {
      setError(err?.message || authError || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  if (missingPending) {
    return (
      <div>
        <FlashAlert
          variant="warning"
          message="Your login session expired. Please sign in again from the login page."
        />
        <div className="auth-footer-links mt-3">
          <Link href={loginHref}>Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FlashAlert variant="info" message={`We sent a sign-in code to ${email}. Enter it below.`} autoHideMs={0} />
      <FlashAlert variant="danger" message={error} onAutoHide={() => setError("")} />
      <Input
        label="Email code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={token}
        onChange={(event) => setToken(event.target.value.replace(/\D/g, "").slice(0, 8))}
        placeholder="123456"
        isInvalid={Boolean(fieldErrors.token)}
      />
      <FormErrorText message={fieldErrors.token} className="mb-3" />
      <Button className="w-100 auth-submit-btn" type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify and continue"}
      </Button>
      <div className="auth-footer-links">
        <Link
          href={loginHref}
          onClick={() => {
            clearPendingLoginOtp();
          }}
        >
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default AuthVerifyLoginOtpForm;
