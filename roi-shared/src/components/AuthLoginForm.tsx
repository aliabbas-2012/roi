// @ts-nocheck
"use client";

import React, { Suspense, useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";
import FlashAlert from "./FlashAlert";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateLoginFields } from "../utils/validation";
import { setPendingLoginOtp } from "../utils/pendingLoginOtp";

const AuthLoginQueryAlerts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stripAuthQueryFlags = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("registered");
    next.delete("verify");
    next.delete("passwordUpdated");
    const qs = next.toString();
    const path = pathname || "/login";
    router.replace(qs ? `${path}?${qs}` : path);
  }, [router, pathname, searchParams]);

  const registered = searchParams.get("registered") === "1";
  const verifyEmail = searchParams.get("verify") === "1";
  const passwordUpdated = searchParams.get("passwordUpdated") === "1";

  const bannerMessage = passwordUpdated
    ? "Password updated successfully, please login."
    : registered && verifyEmail
      ? "Account created successfully. Please check your email inbox, confirm your email, and then return."
      : registered
        ? "Account created successfully. You can sign in now."
        : "";

  return (
    <FlashAlert
      variant="success"
      message={bannerMessage}
      onAutoHide={bannerMessage ? stripAuthQueryFlags : undefined}
    />
  );
};

const AuthLoginForm = ({
  role,
  emailPlaceholder,
  showRegisterLink = false,
  registerHref = "/register",
  otpVerifyHref = "/verify-login-otp",
}) => {
  const router = useRouter();
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState(emailPlaceholder || "");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextErrors = validateLoginFields({ email, password });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      await login({ email, password, role });
      setPendingLoginOtp({ email: String(email || "").trim(), role });
      router.push(otpVerifyHref);
    } catch (err) {
      setError(err?.message || authError || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Suspense fallback={null}>
        <AuthLoginQueryAlerts />
      </Suspense>
      <FlashAlert variant="danger" message={error} onAutoHide={() => setError("")} />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={emailPlaceholder}
        isInvalid={Boolean(fieldErrors.email)}
      />
      <FormErrorText message={fieldErrors.email} />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="********"
        isInvalid={Boolean(fieldErrors.password)}
      />
      <FormErrorText message={fieldErrors.password} className="mb-3" />
      <Button className="w-100 auth-submit-btn" type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="auth-footer-links">
        <Link href="/forgot-password">Forgot password?</Link>
        {showRegisterLink ? <Link href={registerHref}>Create account</Link> : null}
      </div>
    </form>
  );
};

export default AuthLoginForm;
