// @ts-nocheck
"use client";

import React from "react";
import { Button, Input } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot Password">
      <Input label="Email" type="email" placeholder="client@roi.com" />
      <Button className="w-100">Send reset link</Button>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
