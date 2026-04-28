// @ts-nocheck
"use client";

import React from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const UsersContent = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="h5 mb-3">Users</h3>
        <UserForm />
        <UserTable />
      </div>
    </div>
  );
};

export default UsersContent;
