// @ts-nocheck
"use client";

import React from "react";
import { Form } from "react-bootstrap";

const FormErrorText = ({ message, className = "mb-2" }) => {
  if (!message) return null;
  return <Form.Text className={`text-danger d-block ${className}`.trim()}>{message}</Form.Text>;
};

export default FormErrorText;
