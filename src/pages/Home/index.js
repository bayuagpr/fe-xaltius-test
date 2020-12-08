import React, { useState } from "react";
import ColumnWrapper from "../../components/ColumnWrapper";
import TextField from "../../components/TextField";
import Card from "../../components/Card";
import Button from "../../components/Button";
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

  const history = useHistory();

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();
    const body = {
      name: name,
      age: age,
    };
    const data = await api.postProcessAge(body).catch((error) => {
      const errorBody = JSON.parse(error.err);
      alert(errorBody.message);
    });
    setPersonColor(data.data);
    if (data) {
      closeLoading();
      history.push(`/color`);
    }
  };

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit}>
          <ColumnWrapper>
            <h1>Age Color Generator</h1>
            <TextField
              name="name"
              type="text"
              value={name}
              placeholder="Type your name here"
              onChange={onChangeName}
            />
            <TextField
              name="age"
              type="number"
              value={age}
              placeholder="Type your age here"
              onChange={onChangeAge}
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
