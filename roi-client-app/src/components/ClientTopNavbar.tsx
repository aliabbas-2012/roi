// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "roi-shared";

const ClientTopNavbar = ({ leftAction }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Navbar bg="white" className="top-navbar border-bottom">
      <Container fluid>
        <div className="d-lg-none me-2">{leftAction}</div>
        <Navbar.Brand className="fw-semibold">Customer Dashboard</Navbar.Brand>
        <Dropdown align="end">
          <Dropdown.Toggle as="button" className="topbar-avatar-button" id="client-user-dropdown">
            AA
          </Dropdown.Toggle>
          <Dropdown.Menu className="topbar-user-dropdown">
            <div className="topbar-user-summary">
              <p className="topbar-user-name">Ali Abbas</p>
              <p className="topbar-user-email">aliabbasrs2023@gmail.com</p>
              <p className="topbar-user-id">ID: 1152</p>
            </div>
            <Dropdown.Item as={Link} href="/profile">
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
      </Container>
    </Navbar>
  );
};

export default ClientTopNavbar;
