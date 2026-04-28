// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faHandHoldingDollar,
  faMoneyBillTransfer,
  faUser,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: faChartPie },
  { to: "/plans", label: "Plans", icon: faWallet },
  { to: "/investments", label: "Investments", icon: faHandHoldingDollar },
  { to: "/withdraw", label: "Withdraw", icon: faMoneyBillTransfer },
  { to: "/referrals", label: "Referrals", icon: faUserGroup },
  { to: "/profile", label: "Profile", icon: faUser },
];

const ClientSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar-panel p-3">
      <h5 className="mb-4">ROI Client</h5>
      <div className="d-flex flex-column gap-1">
        {items.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`sidebar-link ${pathname === item.to ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientSidebar;
