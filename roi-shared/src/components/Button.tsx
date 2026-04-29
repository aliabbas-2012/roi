// @ts-nocheck
import React from "react";
import { Button as BsButton } from "react-bootstrap";

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variantClass = variant === "outline" ? "btn-neon-outline" : variant === "ghost" ? "btn-neon-ghost" : "btn-neon";
  return (
    <BsButton className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </BsButton>
  );
};

export default Button;
