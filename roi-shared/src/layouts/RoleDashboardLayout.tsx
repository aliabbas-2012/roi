// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import BaseDashboardLayout from "./BaseDashboardLayout";
import Button from "../components/Button";

const RoleDashboardLayout = ({ children, Sidebar, TopNavbar, BottomNav }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 992) {
      setIsSidebarCollapsed((prev) => !prev);
      return;
    }
    setShowSidebar(true);
  };

  return (
    <>
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="d-lg-none mobile-sidebar-canvas">
        <Offcanvas.Header closeButton />
        <Offcanvas.Body className="p-0">
          <Sidebar onItemClick={() => setShowSidebar(false)} />
        </Offcanvas.Body>
      </Offcanvas>

      <BaseDashboardLayout
        sidebar={
          <aside className={`dashboard-sidebar d-none d-lg-block ${isSidebarCollapsed ? "collapsed" : ""}`}>
            <Sidebar collapsed={isSidebarCollapsed} />
          </aside>
        }
        navbar={
          <TopNavbar
            leftAction={
              <Button className="mobile-menu-button" size="sm" onClick={handleSidebarToggle}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
            }
          />
        }
        mobileNav={<BottomNav />}
      >
        {children}
      </BaseDashboardLayout>
    </>
  );
};

export default RoleDashboardLayout;
