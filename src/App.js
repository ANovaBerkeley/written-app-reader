import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Applications from "./components/applications/applications";
import Guidelines from "./components/guidelines/guidelines";
import Decisions from "./components/decisions/decisions";
import Login from "./components/login/login";
import "./global.js";
import "./App.css";
import history from "./utils/history";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <div>
          <Switch>
            <Route path="/app-reader-test-deploy/login">
              <Login />
            </Route>
            <Route path="/app-reader-test-deploy/guidelines">
              <Guidelines />
            </Route>
            <Route path="/app-reader-test-deploy/applications">
              <Applications />
            </Route>
            <Route path="/app-reader-test-deploy/decisions">
              <Decisions />
            </Route>
            <Redirect from="" to="/app-reader-test-deploy/login" />
          </Switch>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
};

export default App;
