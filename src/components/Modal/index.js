import React from "react";
import { ModalContent, ModalBackground } from "./styles";

const Modal = (props) => {
  const close = (e) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose();
    }
  };

  if (props.isOpen === false) return null;

  return (
    <div>
      <ModalContent>{props.children}</ModalContent>
      <ModalBackground onClick={(e) => close(e)} />
    </div>
  );
};

export default Modal;
