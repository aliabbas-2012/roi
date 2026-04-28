// @ts-nocheck
"use client";

import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Input } from "roi-shared";
import AuthLayout from "../../layouts/AuthLayout";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("roi_mock_token", "client-token");
    router.push("/dashboard");
  };

  return (
    <AuthLayout title="Client Login">
      <Input label="Email" type="email" placeholder="client@roi.com" />
      <Input label="Password" type="password" placeholder="********" />
      <Button className="w-100" onClick={handleLogin}>
        Sign in
      </Button>
    </AuthLayout>
  );
};

export default LoginPage;
