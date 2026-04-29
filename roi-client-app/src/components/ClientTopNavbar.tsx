// @ts-nocheck
"use client";

import React from "react";
import { RoleTopNavbar } from "roi-shared";

const ClientTopNavbar = ({ leftAction }) => (
  <RoleTopNavbar leftAction={leftAction} dropdownId="client-user-dropdown" brand="ROI" />
);

export default ClientTopNavbar;
