// @ts-nocheck
"use client";

import React from "react";
import {
  faArrowRightFromBracket,
  faChartPie,
  faHandHoldingDollar,
  faMoneyBillTransfer,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { RoleSidebar } from "roi-shared";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: faChartPie },
  { to: "/plans", label: "Plans", icon: faWallet },
  { to: "/investments", label: "Investments", icon: faHandHoldingDollar },
  { to: "/withdraw", label: "Withdraw", icon: faMoneyBillTransfer },
  { to: "/referrals", label: "Referrals", icon: faUserGroup },
  { to: "/login", label: "Logout", icon: faArrowRightFromBracket, isLogout: true },
];

const ClientSidebar = ({ collapsed = false, onItemClick }) => (
  <RoleSidebar
    items={items}
    collapsed={collapsed}
    onItemClick={onItemClick}
    user={{ name: "Akbar Ali", email: "vgsync99@gmail.com", joinedAt: "2026-04-27 11:03 PM" }}
  />
);

export default ClientSidebar;
