// @ts-nocheck
"use client";

import React from "react";
import { AuthLoginForm } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Client Login">
      <AuthLoginForm
        role="client"
        emailPlaceholder="client@roi.com"
        showRegisterLink
        registerHref="/register"
      />
    </AuthLayout>
  );
};

export default LoginPage;
