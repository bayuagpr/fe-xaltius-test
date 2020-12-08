import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import CenteredWrapper from "../../components/CenteredWrapper";
import history from "../../config/history";
import Home from "../Home";
import Color from "../Color";

class App extends Component {
  render() {
    return (
      <CenteredWrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/color">
              <Color />
            </Route>
          </Switch>
        </Router>
      </CenteredWrapper>
    );
  }
}

export default App;
