import React from "react";
import { Button as BsButton } from "react-bootstrap";

const Button = ({ children, ...props }) => {
  return <BsButton {...props}>{children}</BsButton>;
};

export default Button;
