import React from "react";
import { Modal } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  handleClose: () => void;
  message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  message,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invalid Input</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
