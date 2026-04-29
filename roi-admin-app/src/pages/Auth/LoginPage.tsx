// @ts-nocheck
"use client";

import React from "react";
import { AuthLoginForm } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Admin Login">
      <AuthLoginForm role="admin" emailPlaceholder="admin@roi.com" />
    </AuthLayout>
  );
};

export default LoginPage;
