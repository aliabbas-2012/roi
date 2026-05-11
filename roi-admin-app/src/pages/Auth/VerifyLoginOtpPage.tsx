// @ts-nocheck
"use client";

import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { AuthVerifyLoginOtpForm } from "roi-shared";

const VerifyLoginOtpPage = () => {
  return (
    <AuthLayout title="Enter sign-in code">
      <AuthVerifyLoginOtpForm loginHref="/login" dashboardHref="/dashboard" />
    </AuthLayout>
  );
};

export default VerifyLoginOtpPage;
