// @ts-nocheck
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Alert } from "react-bootstrap";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { validateLoginFields } from "../utils/validation";

const AuthLoginForm = ({ role, emailPlaceholder, showRegisterLink = false, registerHref = "/register" }) => {
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
      router.push("/dashboard");
    } catch (err) {
      setError(err?.message || authError || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error ? <Alert variant="danger">{error}</Alert> : null}
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
