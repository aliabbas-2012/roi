// @ts-nocheck
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <Spinner animation="border" size="sm" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
