// @ts-nocheck
"use client";

import React from "react";
import { RoleTopNavbar } from "roi-shared";

const AdminTopNavbar = ({ leftAction }) => <RoleTopNavbar leftAction={leftAction} dropdownId="admin-user-dropdown" brand="ROI" />;

export default AdminTopNavbar;
