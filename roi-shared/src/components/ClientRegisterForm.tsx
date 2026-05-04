// @ts-nocheck
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import PhoneNumberInput from "./PhoneNumberInput";
import FormErrorText from "./FormErrorText";
import useAuth from "../hooks/useAuth";
import { validateRegisterFields } from "../utils/validation";

const ClientRegisterForm = () => {
  const router = useRouter();
  const { registerClient, error: authError } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const nextErrors = validateRegisterFields({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password,
    });
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      await registerClient({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        countryCode,
        phoneNumber: phoneNumber.trim(),
        password,
      });
      router.push("/login?registered=1");
    } catch (err) {
      setError(err?.message || authError || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Input
        label="First name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        isInvalid={Boolean(fieldErrors.firstName)}
      />
      <FormErrorText message={fieldErrors.firstName} />
      <Input
        label="Last name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        isInvalid={Boolean(fieldErrors.lastName)}
      />
      <FormErrorText message={fieldErrors.lastName} />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="client@roi.com"
        isInvalid={Boolean(fieldErrors.email)}
      />
      <FormErrorText message={fieldErrors.email} />
      <PhoneNumberInput
        label="Phone number"
        country="pk"
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onChange={({ countryCode: nextCountryCode, phoneNumber: nextPhoneNumber }) => {
          setCountryCode(nextCountryCode);
          setPhoneNumber(nextPhoneNumber);
        }}
        countryCodeError={fieldErrors.countryCode}
        phoneNumberError={fieldErrors.phoneNumber}
        placeholder="3001234567"
      />
      <PasswordInput
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="********"
        isInvalid={Boolean(fieldErrors.password)}
      />
      <FormErrorText message={fieldErrors.password} className="mb-3" />
      <Button className="w-100 auth-submit-btn" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </Button>

      <div className="auth-footer-links">
        <Link href="/login">Back to login</Link>
      </div>
    </form>
  );
};

export default ClientRegisterForm;
