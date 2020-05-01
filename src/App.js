import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Application from "./components/applications/application";
import Guidelines from "./components/guidelines/guidelines";
import Decisions from "./components/decisions/decisions";
import "./global.js";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      reviewerName: null,
      error: null,
    };
  }

  /** 
   * Prompts user to enter their name. 
   * If the name is valid, allow the user to proceed & populate reviewerName state
   * If invalid, populate error state. 
   * Gets called on Mount and on refresh.
   */
  authUser() {
    const error = Error("Invalid Credentials!");
    if (!this.state.reviewerName) {
      var userName = prompt("Please enter your name: ", "First Last");
      if (userName === null || userName === "" || !global.OFFICERS.includes(userName)) { // TODO: fix this weak-ass auth approach
        this.setState({error: error});
      } else {
        var keyAttempt = prompt("Secret key: ", "Given to you by executives");
        if (keyAttempt === null || keyAttempt === "" || !global.SEM_SECRET===keyAttempt) { // TODO: fix this weak-ass auth approach
          this.setState({error: error});
        } else {
          this.setState({reviewerName: userName});
        }
      }
    }
  }

  componentDidMount() {
    this.authUser();
  }

  render() {
    const error = this.state.error;
    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <Router>
        <div>
          <NavBar />
          <hr />
          <div>
            <Switch>
              <Route path="/written-app/guidelines">
                <Guidelines />
              </Route>
              <Route path="/written-app/applications">
                <Application reviewerName={this.state.reviewerName}/>
              </Route>
              <Route path="/written-app/decisions">
                <Decisions />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function NavBar() {
  return (
    <div class="topnav">
      <ul>
        <li>
          <Link id="guidelines" to="/written-app/guidelines" style={{ color: 'inherit', textDecoration: 'inherit'}}>Guidelines</Link>
        </li>
        <li>
          <Link id="apps" to="/written-app/applications" style={{ color: 'inherit', textDecoration: 'inherit'}}>Read applications</Link>
        </li>
        <li>
          <Link id="decisions" to="/written-app/decisions" style={{ color: 'inherit', textDecoration: 'inherit'}}>See Your App Decision History (tbd)</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;