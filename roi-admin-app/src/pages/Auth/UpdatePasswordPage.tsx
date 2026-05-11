// @ts-nocheck
"use client";

import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { AuthUpdatePasswordForm } from "roi-shared";

const UpdatePasswordPage = () => {
  return (
    <AuthLayout title="Update password">
      <AuthUpdatePasswordForm loginHref="/login" />
    </AuthLayout>
  );
};

export default UpdatePasswordPage;
