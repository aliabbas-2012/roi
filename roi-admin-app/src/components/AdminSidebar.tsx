// @ts-nocheck
"use client";

import React from "react";
import {
  faArrowRightFromBracket,
  faBoxOpen,
  faChartLine,
  faReceipt,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { RoleSidebar } from "roi-shared";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: faChartLine },
  { to: "/users", label: "Users", icon: faUsers },
  { to: "/packages", label: "Packages", icon: faBoxOpen },
  { to: "/customers", label: "Customers", icon: faStore },
  { to: "/purchases", label: "Purchases", icon: faReceipt },
  { to: "/login", label: "Logout", icon: faArrowRightFromBracket, isLogout: true },
];

const AdminSidebar = ({ collapsed = false, onItemClick }) => (
  <RoleSidebar
    items={items}
    collapsed={collapsed}
    onItemClick={onItemClick}
    user={{ name: "Akbar Ali", email: "vgsync99@gmail.com", joinedAt: "2026-04-27 11:03 PM" }}
  />
);

export default AdminSidebar;
