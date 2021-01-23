import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import toaster from "toasted-notes"; // requires react-spring module! yarn add toasted-notes; npm install react-spring;

import "./applications.css";
import "../../global.js";
import { shuffle, handleErrors } from "../../utils/helpers";
import { updateRemainingApps, updateNumYeses } from "../../store/actions";

import Application from "./application";
import VoteRemaining from "./voteRemaining";
import { Redirect } from "react-router-dom";

/**
 * @param {*} props: {reviewerName: string}
 */
const Applications = (props) => {
  const { dispatch, remainingApps, numYeses, reviewerName, verified } = props;

  const [error, setError] = useState("");
  const [comments, setComments] = useState("");
  const [flag, setFlag] = useState("No");

  const currentApp = remainingApps.length > 0 ? remainingApps[0] : null;

  const getDecisionsData = async () => {
    const formula = "?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22";
    const decisions = await fetch(
      global.DECISIONS_URL + formula + reviewerName + "%22&view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer " + global.AIRTABLE_KEY,
        },
      }
    )
      .then(handleErrors)
      .then((result) => result.records)
      .catch((error) => {
        setError(error);
        console.log("error fetching decisions data");
        console.log(error);
      });
    return decisions;
  };

  const getApplicationsData = async (decisions) => {
    fetch(global.APPLICATIONS_URL + "?view=Grid%20view", {
      headers: {
        Authorization: "Bearer " + global.AIRTABLE_KEY,
      },
    })
      .then(handleErrors)
      .then((result) => {
        const yeses =
          global.NUM_YES -
          decisions.filter((r) => r.fields["Interview"] === "Yes").length;
        dispatch(updateNumYeses(yeses));

        let remaining = result.records.filter(
          (r) => !decisions.map((r) => r.fields["ID"]).includes(r.id)
        );
        remaining = shuffle(remaining);
        console.log("updating remaining apps");
        console.log(remaining);
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
   * @param {string} reviewerName: name of reviewer
   */
  const airtableStateHandler = async () => {
    const decisions = await getDecisionsData();

    await getApplicationsData(decisions);

    setComments("");
    setFlag("No");
  };

  /**
   * Asynchronously submits a vote via POST and calls airtableStateHandler.
   * @param {string} applicantName: applicant name
   * @param {string} reviewerName: name of reviewer
   * @param {string} vote: "Yes" or "No" (interview decision)
   * @param {string} flag: "Yes" or "No" (mark as flagged)
   * @param {string} comments: comments for this application
   * @param {string} id: application ID from the All Applications Table
   */
  const airtableVoteHandler = async (
    applicantName,
    reviewerName,
    vote,
    flag,
    comments,
    id
  ) => {
    await fetch(global.DECISIONS_URL, {
      body:
        '{"records": [{"fields": {"Applicant Name": "' +
        applicantName +
        '","Reviewer Name": "' +
        reviewerName +
        '","Interview": "' +
        vote +
        '","Flag": "' +
        flag +
        '","Comments": "' +
        comments +
        '", "ID": "' +
        id +
        '"}}]}',
      headers: {
        Authorization: "Bearer " + global.AIRTABLE_KEY,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(handleErrors)
      .then((result) => {
        console.log("SUCCESS submitting vote");
        console.log(result);
        toaster.notify(
          <div className="toast">
            <h4 className="toast-text">
              Voted {vote} for {applicantName}!
            </h4>
          </div>,
          {
            duration: 1000,
            position: "bottom",
          }
        );

        if (vote === "Yes") {
          dispatch(updateNumYeses(numYeses - 1));
        }
        const newRemainingApps = Object.assign([], remainingApps);
        newRemainingApps.shift();
        dispatch(updateRemainingApps(newRemainingApps));
        setComments("");
        setFlag("No");
        document.getElementById("app-view").scrollTop = 0;
      })
      .catch((error) => {
        setError(error);
        console.log("error submitting vote");
        console.log(error);
      });
  };

  /**
   * Handles the event where the user comments something
   * @param {event} event: change event
   */
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  /**
   * Handles the event where the user checks the flag check box to flag an app
   * @param {event} event: change event
   */
  const handleFlagChange = (event) => {
    const flagState = event.target.checked ? "Yes" : "No";
    setFlag(flagState);
  };

  const handleSkip = () => {
    const newRemainingApps = Object.assign([], remainingApps);
    newRemainingApps.push(newRemainingApps.shift());
    dispatch(updateRemainingApps(newRemainingApps));
    setComments("");
    setFlag("No");
    document.getElementById("app-view").scrollTop = 0;
  };

  /** Sets up app reader component */
  useEffect(() => {
    airtableStateHandler();
  }, []);

  const doneVoting = remainingApps.length === 0 || numYeses === 0;
  let id = "";
  let applicantName = "";
  if (!doneVoting && currentApp) {
    const fields = currentApp.fields;
    id = currentApp.id;
    applicantName = fields["Name"];
  }

  if (!verified) {
    return (<Redirect from="" to="/app-reader-test-deploy/login"/>);
  } else {
    return (
      <div>
        <div className="container">
          <div className="header">
            <div className="header-application">Application</div>
            <div className="header-stats">
              Apps Remaining: {remainingApps.length}
            </div>
            <div className="header-stats">Yeses Remaining: {numYeses}</div>
          </div>

          <div className="app-section">
            <div className="app-view" id="app-view">
              {currentApp && <Application currentApp={currentApp} />}
            </div>
            <div className="app-options">
              <h3 className="reviewer-label">Reviewer:</h3>
              <p className="reviewer-name">{reviewerName}</p>
              <h4 className="comments-label">Comment:</h4>
              <textarea
                id="comments-textbox"
                className="comments-textbox"
                name="app"
                value={comments}
                onChange={handleCommentsChange}
              ></textarea>
              <div className="flag">
                <input
                  id="flag-checkbox"
                  className="flag-checkbox"
                  type="checkbox"
                  checked={flag === "Yes"}
                  onChange={handleFlagChange}
                />
                <label htmlFor="flag-checkbox">Flag</label>
              </div>
              {doneVoting ? (
                <VoteRemaining />
              ) : (
                <div className="vote">
                  {" "}
                  <h3 className="vote-label">Vote</h3>
                  <button
                    className="no-button"
                    disabled={numYeses <= 0}
                    onClick={() => {
                      airtableVoteHandler(
                        applicantName,
                        reviewerName,
                        "No",
                        flag,
                        comments,
                        id
                      );
                      window.scrollTo(0, 0);
                    }}
                  >
                    No
                  </button>
                  <button className="skip-button" onClick={handleSkip}>
                    Skip
                  </button>
                  <button
                    className="yes-button"
                    disabled={numYeses <= 0}
                    onClick={() => {
                      airtableVoteHandler(
                        applicantName,
                        reviewerName,
                        "Yes",
                        flag,
                        comments,
                        id
                      );
                      window.scrollTo(0, 0);
                    }}
                  >
                    Yes
                  </button>
                </div>
              )}
            </div>
          </div>
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
    remainingApps: state.mainReducer.remainingApps,
    numYeses: state.mainReducer.numYeses,
  };
};

export default connect(mapStateToProps)(Applications);
