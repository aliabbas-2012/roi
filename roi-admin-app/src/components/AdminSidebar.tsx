// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faChartLine,
  faReceipt,
  faStore,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: faChartLine },
  { to: "/users", label: "Users", icon: faUsers },
  { to: "/packages", label: "Packages", icon: faBoxOpen },
  { to: "/customers", label: "Customers", icon: faStore },
  { to: "/purchases", label: "Purchases", icon: faReceipt },
  { to: "/profile", label: "Profile", icon: faUser },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar-panel p-3">
      <h5 className="mb-4">ROI Admin</h5>
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

export default AdminSidebar;
