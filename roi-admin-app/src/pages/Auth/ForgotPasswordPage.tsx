// @ts-nocheck
"use client";

import React from "react";
import { AuthForgotPasswordForm } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot Password">
      <AuthForgotPasswordForm emailPlaceholder="admin@roi.com" loginHref="/login" />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
