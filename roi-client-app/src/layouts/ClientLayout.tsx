// @ts-nocheck
"use client";

import React from "react";
import { RoleDashboardLayout } from "roi-shared";
import ClientSidebar from "../components/ClientSidebar";
import ClientBottomNav from "../components/ClientBottomNav";
import ClientTopNavbar from "../components/ClientTopNavbar";

const ClientLayout = ({ children }) => (
  <RoleDashboardLayout Sidebar={ClientSidebar} TopNavbar={ClientTopNavbar} BottomNav={ClientBottomNav}>
    {children}
  </RoleDashboardLayout>
);

export default ClientLayout;
