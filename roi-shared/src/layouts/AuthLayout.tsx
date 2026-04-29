// @ts-nocheck
import React from "react";
import { Container } from "react-bootstrap";

const AuthLayout = ({ title, children }) => {
  return (
    <Container className="auth-layout">
      <div className="auth-card mx-auto">
        {title ? <h3 className="mb-4">{title}</h3> : null}
        {children}
      </div>
    </Container>
  );
};

export default AuthLayout;
