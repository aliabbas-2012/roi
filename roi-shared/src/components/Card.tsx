// @ts-nocheck
import React from "react";
import { Card as BsCard } from "react-bootstrap";

const Card = ({ title, children, ...props }) => {
  return (
    <BsCard {...props}>
      {title ? <BsCard.Header>{title}</BsCard.Header> : null}
      <BsCard.Body>{children}</BsCard.Body>
    </BsCard>
  );
};

export default Card;
