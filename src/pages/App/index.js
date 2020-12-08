import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import CenteredWrapper from "../../components/CenteredWrapper";
import history from "../../config/history";
import Home from "../Home";
import Color from "../Color";
import NotFound from "../NotFound";
import { isColorReady } from "../../redux/selectors/personColor";
import { connect } from "react-redux";

const App = ({ isColorReady }) => {
  return (
    <CenteredWrapper>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/color">
            {isColorReady ? <Color /> : <Redirect to="/" />}
          </Route>
          <Route path="/page-not-found">
            <NotFound />
          </Route>
          <Redirect to="/page-not-found" />
        </Switch>
      </Router>
    </CenteredWrapper>
  );
};

const mapStateToProps = (state) => ({
  isColorReady: isColorReady(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
