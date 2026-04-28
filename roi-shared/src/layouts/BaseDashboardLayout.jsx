import React from "react";
import { Container } from "react-bootstrap";

const BaseDashboardLayout = ({ navbar, sidebar, children }) => {
  return (
    <div className="dashboard-shell">
      {sidebar}
      <div className="dashboard-main">
        {navbar}
        <Container fluid className="py-4">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default BaseDashboardLayout;
