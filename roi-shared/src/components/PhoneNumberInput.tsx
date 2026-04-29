// @ts-nocheck
"use client";

import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import FormErrorText from "./FormErrorText";

const PhoneNumberInput = ({
  label = "Phone number",
  country = "pk",
  countryCode = "+92",
  phoneNumber = "",
  onChange,
  countryCodeError,
  phoneNumberError,
  placeholder = "3001234567",
}) => {
  const value = `${String(countryCode || "").replace("+", "")}${String(phoneNumber || "")}`;

  return (
    <Form.Group className="mb-3">
      {label ? <Form.Label>{label}</Form.Label> : null}
      <PhoneInput
        country={country}
        value={value}
        onChange={(nextValue, countryData) => {
          const dialDigits = String(countryData?.dialCode || "");
          const selectedCode = dialDigits ? `+${dialDigits}` : "";
          const rawDigits = String(nextValue || "").replace(/\D/g, "");
          const nationalNumber = rawDigits.startsWith(dialDigits) ? rawDigits.slice(dialDigits.length) : rawDigits;
          onChange?.({ countryCode: selectedCode, phoneNumber: nationalNumber });
        }}
        inputProps={{
          name: "phone",
          required: false,
        }}
        containerClass="phone-input-container"
        inputClass={`phone-input-control ${phoneNumberError ? "phone-input-invalid" : ""}`}
        buttonClass="phone-input-flag-btn"
        dropdownClass="phone-input-dropdown"
        placeholder={placeholder}
        enableSearch
      />
      <FormErrorText message={countryCodeError} className="" />
      <FormErrorText message={phoneNumberError} className="" />
    </Form.Group>
  );
};

export default PhoneNumberInput;
