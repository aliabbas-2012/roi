"use client";

import React from "react";
import { Button } from "react-bootstrap";
import { Input } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage = () => {
  return (
    <AuthLayout title="Create Account">
      <Input label="Full name" placeholder="Enter your full name" />
      <Input label="Email" type="email" placeholder="client@roi.com" />
      <Input label="Password" type="password" placeholder="********" />
      <Button className="w-100">Register</Button>
    </AuthLayout>
  );
};

export default RegisterPage;
