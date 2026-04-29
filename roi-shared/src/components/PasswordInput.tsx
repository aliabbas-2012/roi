// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ label = "Password", id, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-3" controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <div className="input-with-toggle">
        <Form.Control {...props} type={showPassword ? "text" : "password"} />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
    </Form.Group>
  );
};

export default PasswordInput;
