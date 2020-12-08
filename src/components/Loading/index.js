import React from "react";
import Modal from "../Modal";
import { StyledSpinner } from "./styles";

const Loading = (props) => {
  return (
    <Modal isOpen={props.isOpen}>
      <h2>{props.message}</h2>
      <StyledSpinner viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </StyledSpinner>
    </Modal>
  );
};

export default Loading;
