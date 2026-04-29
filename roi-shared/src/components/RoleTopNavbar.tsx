// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const RoleTopNavbar = ({ leftAction, dropdownId = "user-dropdown", brand = "ROI", profileHref = "/profile", user }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const displayUser = user || {
    name: "Ali Abbas",
    email: "aliabbasrs2023@gmail.com",
    id: "1152",
    initials: "AA",
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Navbar className="top-navbar">
      <Container fluid>
        <div className="top-navbar-side d-flex align-items-center gap-2">{leftAction}</div>
        <Navbar.Brand className="top-navbar-brand">{brand}</Navbar.Brand>
        <div className="top-navbar-side d-flex align-items-center gap-2 justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle as="button" className="topbar-avatar-button" id={dropdownId}>
              {displayUser.initials}
            </Dropdown.Toggle>
            <Dropdown.Menu className="topbar-user-dropdown">
              <div className="topbar-user-summary">
                <p className="topbar-user-name">{displayUser.name}</p>
                <p className="topbar-user-email">{displayUser.email}</p>
                <p className="topbar-user-id">ID: {displayUser.id}</p>
              </div>
              <Dropdown.Item as={Link} href={profileHref}>
                <span className="topbar-menu-icon profile">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLogout}>
                <span className="topbar-menu-icon logout">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default RoleTopNavbar;
