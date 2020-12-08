import React from "react";
import ColumnWrapper from "../../components/ColumnWrapper";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push("/");
  };
  return (
    <div className="white-text ">
      <ColumnWrapper>
        <h1>Page Not Found</h1>
        <Button onClick={goToHome}>Back to home</Button>
      </ColumnWrapper>
    </div>
  );
};

export default NotFound;
