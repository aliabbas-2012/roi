import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ label, id, ...props }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label ? <Form.Label>{label}</Form.Label> : null}
      <Form.Control {...props} />
    </Form.Group>
  );
};

export default Input;
