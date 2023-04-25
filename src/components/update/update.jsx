import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import "./update.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Application from "../applications/application"
import { handleErrors } from "../../utils/helpers";
import { AIRTABLE_KEY, QUESTION_ORDER } from "../../secrets.js";
import { Link } from "react-router-dom";

const Update = (props) => {
  const { verified, reviewerName, decisions } = props;
  const queryParameters = new URLSearchParams(window.location.search);
  const decisionId = queryParameters.get("id");
  console.log(global.DECISIONS_URL + `/${decisionId}?api_key=${AIRTABLE_KEY}`)

  fetch(global.DECISIONS_URL + `/${decisionId}?api_key=${AIRTABLE_KEY}`)
    .then(handleErrors)
    .then((decision) => {
        console.log(decision);
        // document.getElementById("getme").innerHTML = decision.id;
        fetch(global.APPLICATIONS_URL + `/${decision.fields.ID}?api_key=${AIRTABLE_KEY}`)
            .then(handleErrors)
            .then((application) =>{
                console.log(application);
                document.getElementById("applicant-name").innerHTML = decision.fields["Applicant Name"];
                let questions = "";
                const keys = Object.keys(application.fields);
                for (let i = 0; i < QUESTION_ORDER.length; i++) {
                    const question_key = keys[QUESTION_ORDER[i]];
                    questions = questions.concat(`<p><b>${question_key}</b></p><p>${application.fields[question_key]}</p>`);
                }
                document.getElementById("questions").innerHTML = questions;
                let savedDecision = "";
                savedDecision = savedDecision.concat(`<input>${decision.fields.comments}</input>`)
                savedDecision = savedDecision.concat(`<input type="checkbox">Interview</input>`)
                savedDecision = savedDecision.concat(`<input type="checkbox">Flag</input>`)
                document.getElementById("saved-decision").innerHTML = savedDecision;
                
            });
    });

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    return (
      <>
        <NavBar page="decisions" />
        <div className="md-body">
          <h2 id="applicant-name">Applicant Name</h2>
          <div id="questions"></div>
          <div id="saved-decision"></div>
          <button>Save</button>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
    reviewerName: state.mainReducer.name,
    decisions: state.mainReducer.decisions
  };
};

export default connect(mapStateToProps)(Update);