import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import "./applications.css";
import "../../global.js";
import { handleErrors } from "../../utils/helpers";
import { updateRemainingApps, updateNumYeses, updateCommentsMap } from "../../store/actions";
import { AIRTABLE_KEY } from "../../secrets.js";
import NavBar from "../navbar/navbar";
import Application from "./application";
import VoteRemaining from "./voteRemaining";
import { Redirect } from "react-router-dom";

/**
 * @param {*} props: {reviewerName: string}
 */
const Applications = (props) => {
  const { dispatch, remainingApps, numYeses, reviewerName, verified, commentsMap } = props;
  const currentApp = remainingApps.length > 0 ? remainingApps[0] : null;
  const [comments, setComments] = useState(currentApp && commentsMap[currentApp.id] ? commentsMap[currentApp.id] : "");
  
  const [flag, setFlag] = useState("No");

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
        Authorization: "Bearer " + AIRTABLE_KEY,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(handleErrors)
      .then((result) => {
        console.log("SUCCESS submitting vote");
        console.log(result);
        const toastMessage = "Voted " + vote + " for " + applicantName + "!";

        toast(toastMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });

        if (vote === "Yes") {
          dispatch(updateNumYeses(numYeses - 1));
        }
        const newRemainingApps = Object.assign([], remainingApps);
        newRemainingApps.shift();
        dispatch(updateRemainingApps(newRemainingApps));
        
        const currentApp = newRemainingApps.length > 0 ? newRemainingApps[0] : null;
        setComments(commentsMap[currentApp.id] ? commentsMap[currentApp.id] : "");
        
        setFlag("No");
        document.getElementById("app-view").scrollTop = 0;
      })
      .catch((error) => {
        console.log("error submitting vote");
        console.log(error);
        toast.error("Unable to submit vote", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });
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
    const newCommentsMap = Object.assign({}, commentsMap);
    newCommentsMap[id] = comments;
    dispatch(updateCommentsMap(newCommentsMap));

    const newRemainingApps = Object.assign([], remainingApps);
    newRemainingApps.push(newRemainingApps.shift());
    dispatch(updateRemainingApps(newRemainingApps));

    const currentApp = newRemainingApps.length > 0 ? newRemainingApps[0] : null;
    setComments(commentsMap[currentApp.id] ? commentsMap[currentApp.id] : ""); 
    
    setFlag("No");
  
    document.getElementById("app-view").scrollTop = 0;
    
    toast("Skipped application", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const doneVoting = remainingApps.length === 0 || numYeses === 0;
  let id = "";
  let applicantName = "";

  if (!doneVoting && currentApp) {
    const fields = currentApp.fields;
    id = currentApp.id;
    applicantName = fields["Name"];
  }

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else if (remainingApps.length === 0) {
  
    return (
      <>
        <NavBar page="applications" />
        <div className="applications">
          <div className="app-section" style={{ width: "100%" }}>
            <div className="app-view" id="app-view">
              <div className="header">
                <h1 className="header-application">Application</h1>
                <div className="header-stats">
                  {remainingApps.length} APPS REMAINING
                </div>
              </div>
              <h3>
                Congratulations, you're done!{" "}
                <span role="img" aria-label="yay">
                  &#127881;
                </span>{" "}
              </h3>
              <p>
                You can close this tab and exit out of terminal to close the
                server.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavBar page="applications" />
        <div className="applications">
          <div className="app-section">
            <div className="app-view" id="app-view">
              {currentApp && <Application currentApp={currentApp} />}
            </div>
            <div className="app-options">
              <div className="header-stats">{numYeses} YESES REMAINING</div>
              <div>
                <h4 className="reviewer-label">Reviewer:</h4>
                <p style={{ margin: 0 }}>{reviewerName}</p>
              </div>
              <div>
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
                  <label htmlFor="flag-checkbox"> Flag</label>
                </div>
              </div>
              <div>
                <h4>Vote:</h4>
                <div className="vote-buttons">
                  {doneVoting ? (
                    <VoteRemaining />
                  ) : (
                    <>
                      <button
                        className="vote-button"
                        style={{ backgroundColor: "#9AFFB0" }}
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
                        YES
                      </button>
                      <button
                        className="vote-button"
                        style={{ backgroundColor: "#FF9393" }}
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
                        NO
                      </button>
                    </>
                  )}
                  <button
                    className="vote-button"
                    style={{ backgroundColor: "#CACACA" }}
                    onClick={handleSkip}
                  >
                    SKIP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  console.log("STATE");
  console.log(state);
  return {
    verified: state.mainReducer.verified,
    remainingApps: state.mainReducer.remainingApps,
    reviewerName: state.mainReducer.name,
    numYeses: state.mainReducer.numYeses,
    commentsMap: state.mainReducer.commentsMap,
  };
};

export default connect(mapStateToProps)(Applications);
