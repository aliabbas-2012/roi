// @ts-nocheck
import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ label, id, type, spellCheck, autoCapitalize, autoCorrect, ...props }) => {
  const isEmail = type === "email";

  return (
    <Form.Group className="mb-3" controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control
        {...props}
        type={type}
        spellCheck={isEmail ? false : spellCheck}
        autoCapitalize={isEmail ? "none" : autoCapitalize}
        autoCorrect={isEmail ? "off" : autoCorrect}
      />
    </Form.Group>
  );
};

export default Input;
