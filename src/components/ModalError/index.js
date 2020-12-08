import React from "react";
import Modal from "../Modal";
import Button from "../Button";

const ModalError = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <h2>Generate Error!</h2>
      <h2>{props.message}</h2>
      <Button onClick={props.onClose}>Ok</Button>
    </Modal>
  );
};

export default ModalError;
