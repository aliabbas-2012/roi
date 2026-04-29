// @ts-nocheck
"use client";

import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "roi-shared";

const UserForm = () => {
  return (
    <div className="mb-3">
      <Form.Group className="mb-2">
        <Form.Label>Search user</Form.Label>
        <Form.Control placeholder="Type name or email" />
      </Form.Group>
      <Button variant="primary">Add User</Button>
    </div>
  );
};

export default UserForm;
