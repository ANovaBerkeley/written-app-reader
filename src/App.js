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
  /**
   * Prompts user to enter their name.
   * If the name is valid, allow the user to proceed & populate reviewerName state
   * If invalid, populate error state.
   * Gets called on Mount and on refresh.
   */
  const [reviewerName, setReviewerName] = useState("");
  const [error, setError] = useState("");

  // const authUser = () => {
  //   if (!reviewerName) {
  //     var userName = prompt("Please enter your name: ", "First Last");
  //     if (
  //       userName === null ||
  //       userName === "" ||
  //       !global.OFFICERS.includes(userName)
  //     ) {
  //       // TODO: fix this weak-ass auth approach
  //       setError(Error("Invalid Credentials!"));
  //     } else {
  //       var keyAttempt = prompt("Secret key: ", "Given to you by executives");
  //       if (
  //         keyAttempt === null ||
  //         keyAttempt === "" ||
  //         global.SEM_SECRET !== keyAttempt
  //       ) {
  //         // TODO: fix this weak-ass auth approach
  //         setError(error);
  //       } else {
  //         setReviewerName(userName);
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   authUser();
  // }, []);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <Router history ={history}>
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
              <Applications reviewerName={reviewerName} />
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
