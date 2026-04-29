// @ts-nocheck
"use client";

import React from "react";
import { faBoxOpen, faChartLine, faGift, faStore, faUsers, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { RoleBottomNav } from "roi-shared";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: faChartLine },
  { to: "/users", label: "Users", icon: faUsers },
  { to: "/packages", label: "Packages", icon: faBoxOpen },
  { to: "/customers", label: "Customers", icon: faStore },
  { to: "/purchases", label: "Purchases", icon: faReceipt },
];

const AdminBottomNav = () => <RoleBottomNav items={items} />;

export default AdminBottomNav;
