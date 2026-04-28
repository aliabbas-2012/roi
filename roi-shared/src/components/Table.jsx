import React from "react";
import { Table as BsTable } from "react-bootstrap";

const Table = ({ columns = [], data = [] }) => {
  return (
    <BsTable striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length || 1} className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </BsTable>
  );
};

export default Table;
