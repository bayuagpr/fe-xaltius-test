import React, { useState } from "react";
import ColumnWrapper from "../../components/ColumnWrapper";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import ModalError from "../../components/ModalError";
import Spacer from "../../components/Spacer";
import api from "../../api";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as personColorAction from "../../redux/actions/personColor";
import { bindActionCreators } from "redux";

const Home = ({ personColorAction: { setPersonColor } }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isBirthDateTouched, setIsBirthDateTouched] = useState(false);
  const [nameError, setNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const onChangeName = (event) => {
    if (isNameValid(event.target.value)) {
      if (/\s/.test(event.target.value.charAt(event.target.value.length - 1))) {
        setName(toTitleCase(event.target.value));
      } else {
        setName(event.target.value);
      }
    }
    if (isEmpty(event.target.value)) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const onChangeBirthDate = (value) => {
    setIsBirthDateTouched(true);

    setBirthDate(value);
    if (isEmpty(value)) {
      setBirthDateError("Birth Date is required");
    } else {
      if (calculateAge(new Date(value)) === 0) {
        setBirthDateError("Minimum age is 1 years old");
      } else {
        setBirthDateError("");
      }
    }
  };
  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const onBlurName = () => {
    if (isEmpty(name)) {
      setNameError("Name is required");
    } else {
      setNameError("");
      setName(toTitleCase(name));
    }
  };

  const onBlurBirthDate = () => {
    if (isEmpty(birthDate)) {
      setBirthDateError("Birth Date is required");
    } else {
      if (calculateAge(new Date(birthDate)) === 0) {
        setBirthDateError("Minimum age is 1 years old");
      } else {
        setBirthDateError("");
      }
    }
  };

  const onClickName = () => {
    setIsNameTouched(true);
  };

  const onClickBirthDate = () => {
    setIsBirthDateTouched(true);
  };

  const onFocusName = () => {
    setIsNameTouched(true);
  };

  const onFocusBirthDate = () => {
    setIsBirthDateTouched(true);
  };

  const isValid = () => {
    return (
      isEmpty(nameError) &&
      isEmpty(birthDateError) &&
      !isEmpty(name) &&
      !isEmpty(birthDate)
    );
  };
  const isNameValid = (value) => {
    return !hasNumber(value) && !hasSymbol(value);
  };
  const isEmpty = (value) => {
    return value.toString().length === 0;
  };
  const hasNumber = (value) => {
    return /\d/.test(value);
  };

  const hasSymbol = (value) => {
    return /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  const closeError = () => {
    setIsError(false);
    setErrorMessage("");
  };

  const calculateAge = (dateOfBirth) => {
    const diffTime = Date.now() - dateOfBirth.getTime();
    const ageDiffTime = new Date(diffTime);

    return Math.abs(ageDiffTime.getUTCFullYear() - 1970);
  };

  const processAgeColor = async () => {
    const isFormValid = await isValid();
    if (isFormValid) {
      setIsLoading(true);
      const age = calculateAge(new Date(birthDate));
      const body = {
        name: name,
        age: age,
      };
      const data = await api.postProcessAge(body).catch((error) => {
        const errorBody = { ...error };
        const errorMessage =
          errorBody.message == null
            ? "Internal Server Error"
            : errorBody.message;
        closeLoading();
        setIsError(true);
        setErrorMessage(errorMessage);
      });
      if (data) {
        closeLoading();
        setPersonColor(data.data);
        history.push(`/color`);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNameTouched(true);
    setIsBirthDateTouched(true);

    if (isEmpty(name)) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
    if (isEmpty(birthDate)) {
      setBirthDateError("Birth Date is required");
    } else {
      if (calculateAge(new Date(birthDate)) === 0) {
        setBirthDateError("Minimum age is 1 years old");
      } else {
        setBirthDateError("");
      }
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
            <h2>Age Color Generator</h2>
            <Spacer />
            <TextField
              className="text-field"
              name="name"
              type="text"
              value={name}
              placeholder="Type your name here"
              onChange={onChangeName}
              isTouched={isNameTouched}
              errorMessage={nameError}
              onClick={onClickName}
              onFocus={onFocusName}
              onBlur={onBlurName}
            />
            <TextField
              className="text-field"
              name="birthDate"
              type="date"
              value={birthDate}
              placeholder="Choose your birth date"
              onChange={onChangeBirthDate}
              isTouched={isBirthDateTouched}
              errorMessage={birthDateError}
              onClick={onClickBirthDate}
              onFocus={onFocusBirthDate}
              onBlur={onBlurBirthDate}
              disableFuture
              autoOk
            />
            <Button>Generate</Button>
          </ColumnWrapper>
        </form>
      </Card>
      <Loading isOpen={isLoading} message="Generating your age color..." />
      <ModalError
        isOpen={isError}
        message={errorMessage}
        onClose={() => closeError()}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  personColorAction: bindActionCreators(personColorAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
