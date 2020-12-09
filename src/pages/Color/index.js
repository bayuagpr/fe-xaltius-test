import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPersonColor } from "../../redux/selectors/personColor";
import ColumnWrapper from "../../components/ColumnWrapper";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ColorBox from "../../components/ColorBox";
import RowWrapper from "../../components/RowWrapper";
import { useHistory } from "react-router-dom";

export const Color = ({ personColor }) => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = personColor.colors;
    // setName(personColor.name);
    // setAge(personColor.age);
    return function cleanup() {
      document.body.style.backgroundColor = null;
    };
  });

  const goToHome = (event) => {
    event.preventDefault();
    history.push(`/`);
  };

  return (
    <Card>
      <ColumnWrapper>
        <h2>Hi {personColor.name}!</h2>
        <h2>Welcome to your age color page!</h2>
        <h2>Right now you are {personColor.age} years old</h2>
        <RowWrapper>
          <h2>Your age color is</h2>
          <ColorBox inputColor={personColor.colors} />
        </RowWrapper>
        <Button onClick={goToHome}>Try Again</Button>
      </ColumnWrapper>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  personColor: getPersonColor(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Color);
