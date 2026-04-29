// @ts-nocheck
"use client";

import React from "react";
import { RoleDashboardLayout } from "roi-shared";
import AdminSidebar from "../components/AdminSidebar";
import AdminBottomNav from "../components/AdminBottomNav";
import AdminTopNavbar from "../components/AdminTopNavbar";

const AdminLayout = ({ children }) => (
  <RoleDashboardLayout Sidebar={AdminSidebar} TopNavbar={AdminTopNavbar} BottomNav={AdminBottomNav}>
    {children}
  </RoleDashboardLayout>
);

export default AdminLayout;
