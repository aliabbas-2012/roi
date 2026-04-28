"use client";

import React from "react";
import { Container, Navbar } from "react-bootstrap";

const AdminTopNavbar = ({ leftAction }) => {
  return (
    <Navbar bg="white" className="top-navbar border-bottom">
      <Container fluid>
        <div className="d-lg-none me-2">{leftAction}</div>
        <Navbar.Brand className="fw-semibold">Merchant Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AdminTopNavbar;
