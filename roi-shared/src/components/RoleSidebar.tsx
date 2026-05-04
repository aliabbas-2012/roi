// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const RoleSidebar = ({ items = [], collapsed = false, onItemClick, user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, session } = useAuth();

  const authUser = session?.user;
  const displayUser = user || {
    name: authUser?.name || "User",
    email: authUser?.email || "user@example.com",
    joinedAt: "Active account",
  };

  const handleLogout = async () => {
    await logout();
    onItemClick?.();
    router.push("/login");
  };

  return (
    <div className={`sidebar-panel p-3 ${collapsed ? "sidebar-panel-collapsed" : ""}`}>
      {!collapsed && (
        <div className="sidebar-user-card mb-4">
          <div className="sidebar-avatar">
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <h5>{displayUser.name}</h5>
          <p>{displayUser.email}</p>
          <span>
            <FontAwesomeIcon icon={faEnvelope} /> Joined: {displayUser.joinedAt}
          </span>
        </div>
      )}
      <div className="d-flex flex-column gap-2">
        {items.map((item) =>
          item.isLogout ? (
            <button
              key={item.label}
              type="button"
              onClick={handleLogout}
              className={`sidebar-link sidebar-link-button ${collapsed ? "sidebar-link-icon" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <FontAwesomeIcon icon={item.icon || faArrowRightFromBracket} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ) : (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => onItemClick?.()}
              className={`sidebar-link ${collapsed ? "sidebar-link-icon" : ""} ${
                pathname === item.to ? "active" : ""
              }`}
              title={collapsed ? item.label : undefined}
            >
              <FontAwesomeIcon icon={item.icon} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default RoleSidebar;
