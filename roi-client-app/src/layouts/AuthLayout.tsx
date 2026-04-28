// @ts-nocheck
"use client";

import React from "react";
import { AuthLayout as SharedAuthLayout } from "roi-shared";

const AuthLayout = ({ title, children }) => {
  return <SharedAuthLayout title={title}>{children}</SharedAuthLayout>;
};

export default AuthLayout;
