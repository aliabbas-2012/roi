// @ts-nocheck
"use client";

import React from "react";
import { AuthUpdateUserForm } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const UpdateUserPage = () => {
  return (
    <AuthLayout title="Update User">
      <AuthUpdateUserForm loginHref="/login" />
    </AuthLayout>
  );
};

export default UpdateUserPage;
