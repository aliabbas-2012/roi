"use client";

import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { BaseDashboardLayout } from "roi-shared";
import ClientSidebar from "../components/ClientSidebar";
import ClientTopNavbar from "../components/ClientTopNavbar";

const ClientLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        className="d-lg-none"
      >
        <Offcanvas.Body className="p-0">
          <ClientSidebar />
        </Offcanvas.Body>
      </Offcanvas>

      <BaseDashboardLayout
        sidebar={
          <aside className="dashboard-sidebar d-none d-lg-block">
            <ClientSidebar />
          </aside>
        }
        navbar={
          <ClientTopNavbar
            leftAction={
              <Button variant="outline-dark" size="sm" onClick={() => setShowSidebar(true)}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
            }
          />
        }
      >
        {children}
      </BaseDashboardLayout>
    </>
  );
};

export default ClientLayout;
