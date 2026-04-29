// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoleBottomNav = ({ items = [] }) => {
  const pathname = usePathname();

  return (
    <div className="mobile-bottom-nav d-lg-none">
      {items.map((item) => (
        <Link key={item.to} href={item.to} className={`mobile-bottom-link ${pathname === item.to ? "active" : ""}`}>
          <span className="mobile-bottom-icon">
            <FontAwesomeIcon icon={item.icon} />
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default RoleBottomNav;
