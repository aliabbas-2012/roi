// @ts-nocheck
"use client";

import React from "react";
import { ClientRegisterForm } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout title="Create Account">
      <ClientRegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
