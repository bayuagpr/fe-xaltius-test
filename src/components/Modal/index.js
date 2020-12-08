import React from "react";
import "./index.css";

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
      <div className="modal">{props.children}</div>
      <div className="bg" onClick={(e) => close(e)} />
    </div>
  );
};

export default Modal;
