import React, { useState } from "react";
import ColumnWrapper from "../../components/ColumnWrapper";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import api from "../../api";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as personColorAction from "../../redux/actions/personColor";
import { bindActionCreators } from "redux";

const Home = ({ personColorAction: { setPersonColor } }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");

  const history = useHistory();

  const onChangeName = (event) => {
    setIsTouched(true);
    if (isNameValid(event.target.value)) setName(event.target.value);
    if (isEmpty(event.target.value)) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const onChangeAge = (event) => {
    setIsTouched(true);
    setAge(event.target.value);
    if (isEmpty(event.target.value)) {
      setAgeError("Age is required");
    } else {
      setAgeError("");
    }
  };

  const isValid = async () => {
    return (
      isEmpty(nameError) && isEmpty(ageError) && !isEmpty(name) && !isEmpty(age)
    );
  };
  const isNameValid = (value) => {
    return !hasNumber(value) && !hasSpecialCharacter(value);
  };
  const isEmpty = (value) => {
    return value.toString().length === 0;
  };
  const hasNumber = (value) => {
    return /\d/.test(value);
  };

  const hasSpecialCharacter = (value) => {
    return /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  const processAgeColor = async () => {
    const isFormValid = await isValid();
    if (isFormValid) {
      setIsLoading(true);
      const body = {
        name: name,
        age: age,
      };
      const data = await api.postProcessAge(body).catch((error) => {
        const errorBody = JSON.parse(error.err);
        const errorMessage =
          errorBody.message == null
            ? "Internal Server Error"
            : errorBody.message;
        closeLoading();

        alert(errorMessage);
      });
      setPersonColor(data.data);
      if (data) {
        closeLoading();
        history.push(`/color`);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsTouched(true);

    if (isEmpty(name)) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
    if (isEmpty(age)) {
      setAgeError("Age is required");
    } else {
      setAgeError("");
    }
    setTimeout(() => {
      processAgeColor();
    }, 500);
  };

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit}>
          <ColumnWrapper>
            <h1>Age Color Generator</h1>
            <TextField
              className="text-field"
              name="name"
              type="text"
              value={name}
              placeholder="Type your name here"
              onChange={onChangeName}
              isTouched={isTouched}
              errorMessage={nameError}
            />
            <TextField
              className="text-field"
              name="age"
              type="number"
              value={age}
              placeholder="Type your age here"
              onChange={onChangeAge}
              isTouched={isTouched}
              errorMessage={ageError}
            />
            <Button>Generate</Button>
          </ColumnWrapper>
        </form>
      </Card>
      <Loading
        isOpen={isLoading}
        message="Generating your age color..."
        onClose={() => closeLoading()}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  personColorAction: bindActionCreators(personColorAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
