import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./login.css";
import "../../global.js";
import { AIRTABLE_KEY, NUM_YES, SEM_SECRET, OFFICERS } from "../../secrets.js";
import Logo from "../../static/logo.png";
import {
  updateRemainingApps,
  updateNumYeses,
  login,
} from "../../store/actions";
import { shuffle, handleErrors } from "../../utils/helpers";

const Login = (props) => {
  const { dispatch, verified } = props;
  const [reviewerName, setReviewerName] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const getDecisionsData = async () => {
    const formula = "?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22";
    const decisions = await fetch(
      global.DECISIONS_URL + formula + reviewerName + "%22&view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer " + AIRTABLE_KEY,
        },
      }
    )
      .then(handleErrors)
      .then((result) => result.records) // result.recordss
      .catch((error) => {
        setError(error);
        console.log("error fetching decisions data");
        console.log(error);
      });
    return decisions;
  };

  const getOfficersData = async () => {
    const formula = "?filterByFormula=%7BName%7D%20%3D%20%20%22";
    const officers = await fetch(
      global.OFFICERS_URL + formula + reviewerName + "%22&view=Grid%20view", 
    {
      headers: {
        Authorization: "Bearer " + AIRTABLE_KEY,
      },
    }
  )
    .then(handleErrors)
    .then((result) => result.records)
    .catch((error) => {
      setError(error);
      console.log("error fetching officers data");
      console.log(error);
    });
    return officers;
  };

  const getApplicationsData = async (officers, decisions) => {
    fetch(global.APPLICATIONS_URL + "?view=Grid%20view", {
      headers: {
        Authorization: "Bearer " + AIRTABLE_KEY,
      },
    })
      .then(handleErrors)
      .then((result) => {
        const yeses =
          NUM_YES -
          decisions.filter((r) => r.fields["Interview"] === "Yes").length;
        dispatch(updateNumYeses(yeses));
        
        let reviewerApps = (officers.map((r) => r.fields["All Applications"]));
        let remaining = result.records.filter(
          (r) => ((!decisions.map((r) => r.fields["ID"]).includes(r.id)) && reviewerApps[0].includes(r.id)) 
        );

        remaining = shuffle(remaining);
        console.log("updating remaining apps");
        console.log("Remaining Apps", remaining);
        dispatch(updateRemainingApps(remaining));
      })
      .catch((error) => {
        setError(error);
        console.log("error fetching applications data");
        console.log(error);
      });
  };

  /**
   * Updates state variables to reflect current Airtable state,
   * To find all applications a reviewer has yet to vote on:
   * (1) GET from Decision Table, filter by Reviewer Name
   * (2) GET from All Applications Table
   * from (2) remove all records with matching IDs in (1)
   */
  const airtableStateHandler = async () => {
    const decisions = await getDecisionsData();
    const officers = await getOfficersData();
    await getApplicationsData(officers, decisions);
  };

  const submitForm = () => {
    if (!OFFICERS.includes(reviewerName) || key !== SEM_SECRET) {
      setError("Invalid Credentials. Please try again.");
      return;
    } else {
      dispatch(login(reviewerName));
      airtableStateHandler();
      history.push("/app-reader-test-deploy/guidelines");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (verified) {
    return <Redirect from="" to="/app-reader-test-deploy/guidelines" />;
  } else {
    return (
      <div className="page">
        <img src={Logo} alt="ANova" className="login-logo" />
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: 0 }}>
              Welcome to the ANova Written App Reader!
            </h2>
            <Form.Group className="form-item" size="lg" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-input"
                autoFocus
                type="name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-item" size="lg" controlId="key">
              <Form.Label>Security Key</Form.Label>
              <Form.Control
                className="form-input"
                type="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </Form.Group>
            <Button
              className="form-button"
              block
              size="lg"
              type="submit"
              // disabled={!validateForm()}
              onClick={submitForm}
            >
              Login
            </Button>
          </Form>

          {error && <div className="login-error">{error}</div>}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log("STATE");
  console.log(state);
  return {
    verified: state.mainReducer.verified,
  };
};

export default connect(mapStateToProps)(Login);
