// @ts-nocheck
import React from "react";
import { Modal as BsModal } from "react-bootstrap";

const Modal = ({ title, children, ...props }) => {
  return (
    <BsModal centered {...props}>
      {title ? (
        <BsModal.Header closeButton>
          <BsModal.Title>{title}</BsModal.Title>
        </BsModal.Header>
      ) : null}
      <BsModal.Body>{children}</BsModal.Body>
    </BsModal>
  );
};

export default Modal;
