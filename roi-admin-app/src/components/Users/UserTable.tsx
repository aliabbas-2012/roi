// @ts-nocheck
import React from "react";
import { Table } from "react-bootstrap";

const UserTable = () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
  ];

  const data = [
    { name: "John Doe", email: "john@roi.com", status: "Active" },
    { name: "Jane Smith", email: "jane@roi.com", status: "Pending" },
  ];

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
