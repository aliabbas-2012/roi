"use client";

import React from "react";
import { Container, Navbar } from "react-bootstrap";

const ClientTopNavbar = ({ leftAction }) => {
  return (
    <Navbar bg="white" className="top-navbar border-bottom">
      <Container fluid>
        <div className="d-lg-none me-2">{leftAction}</div>
        <Navbar.Brand className="fw-semibold">Customer Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default ClientTopNavbar;
