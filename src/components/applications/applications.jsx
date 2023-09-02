import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import "./applications.css";
import "../../global.js";
import { handleErrors } from "../../utils/helpers";
import { updateDecisions, updateLockApplications, updateRemainingApps, updateNumYeses, updateCommentsMap, updateFlagsMap } from "../../store/actions";
import { AIRTABLE_KEY } from "../../secrets.js";
import NavBar from "../navbar/navbar";
import Application from "./application";
import VoteRemaining from "./voteRemaining";
import AllApplications from "./allApplications"
import { Redirect } from "react-router-dom";

/**
 * @param {*} props: {reviewerName: string}
 */
const Applications = (props) => {
  const { dispatch, lockApplications, decisions, remainingApps, numYeses, reviewerName, verified, commentsMap, flagsMap } = props;

  const [pos, setPos] = useState(0);
  const currentApp = remainingApps.length > 0 ? remainingApps[pos] : null;
  
  const [comments, setComments] = useState(currentApp && commentsMap && commentsMap[currentApp.id] ? commentsMap[currentApp.id] : "");
  const [flag, setFlag] = useState(currentApp && flagsMap && flagsMap[currentApp.id] ? flagsMap[currentApp.id] : "No");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    setComments(currentApp && commentsMap && commentsMap[currentApp.id] ? commentsMap[currentApp.id] : "");
    setFlag(currentApp && flagsMap && flagsMap[currentApp.id] ? flagsMap[currentApp.id] : "No");
  }, [currentApp]);

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
    setSubmitStatus(true);
    await fetch(global.DECISIONS_URL, {
      body: JSON.stringify({
        "records": [{"fields": {
          "Applicant Name": applicantName,
          "Reviewer Name": reviewerName,
          "Interview": vote,
          "Flag": flag,
          "Comments": comments,
          "ID": id
        }}]}),
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
        const toastMessage = "Successfully submitted vote!";

        toast(toastMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });

        const newDecisions = Object.assign([], decisions);
        newDecisions.push(result.records[0]);
        dispatch(updateDecisions(newDecisions));
        if (vote === "Yes") {
          dispatch(updateNumYeses(numYeses - 1));
        }
        const newRemainingApps = Object.assign([], remainingApps);
        newRemainingApps.splice(pos, 1);
        dispatch(updateRemainingApps(newRemainingApps));
        
        setPos(pos % newRemainingApps.length); 

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
      setSubmitStatus(false);
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

  const handleNext = () => {
    const newCommentsMap = Object.assign({}, commentsMap);
    newCommentsMap[id] = comments;
    dispatch(updateCommentsMap(newCommentsMap));
    
    const newFlagsMap = Object.assign({}, flagsMap);
    newFlagsMap[id] = flag;
    dispatch(updateFlagsMap(newFlagsMap));

    let numApps = remainingApps.length;
    setPos((((pos + 1) % numApps) + numApps) % numApps);

    document.getElementById("app-view").scrollTop = 0;
  }

  const handleBack = () => {
    const newCommentsMap = Object.assign({}, commentsMap);
    newCommentsMap[id] = comments;
    dispatch(updateCommentsMap(newCommentsMap));
    
    const newFlagsMap = Object.assign({}, flagsMap);
    newFlagsMap[id] = flag;
    dispatch(updateFlagsMap(newFlagsMap));

    let numApps = remainingApps.length;
    setPos((((pos - 1) % numApps) + numApps) % numApps);

    document.getElementById("app-view").scrollTop = 0;
  }

  const unlockApplications = () => {
    if (password === "forthekids") {
      dispatch(updateLockApplications(false));
      toast("Applications unlocked!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      toast.error("Incorrect password", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }
  
  const doneVoting = remainingApps.length === 0 || numYeses === 0;
  let id = "";
  let applicantName = "";

  if (currentApp) {
    const fields = currentApp.fields;
    id = currentApp.id;
    applicantName = fields["Name"];
  }

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else if (remainingApps.length == 0) {
    if (lockApplications) {
      return (
        <>
          <NavBar page="applications" />
          <div className="applications">
            <div className="app-section" style={{ width: "100%" }}>
              <div className="app-view" id="app-view">
                <div className="congratulations">
                  <h2>
                    Congratulations, you're done!{" "}
                    <span role="img" aria-label="yay">
                      &#127881;
                    </span>{" "}
                  </h2>
                  <p>
                    When all decisions are submitted, a password will be 
                    provided to unlock all applications. Enter the password 
                    below to unlock.
                  </p>
                  <p>
                    <span role="img" aria-label="caution">
                      &#128721;
                    </span>{" "}
                    CAUTION! DO NOT SUBMIT PASSWORD UNTIL ALL DECISIONS ARE FINAL!
                    {" "}<span role="img" aria-label="caution">
                      &#128721;
                    </span>
                  </p>
                  <p>
                    Once the password is submitted, you will be unable to make 
                    edits to any decisions. 
                  </p>
                  <div className="unlock">
                    <input onChange={event => setPassword(event.target.value)}/>
                    <button 
                      className="unlock-button"
                      onClick={() => unlockApplications()}
                      style={{ backgroundColor: "#248487", color: "white" }}
                    >
                      Unlock All Applications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <NavBar page="applications" />
        <div className="applications">
          <div className="all-applications-view">
            <h2>All Applications</h2>
            <AllApplications></AllApplications>
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
              <div className="header-stats">APP {pos + 1} OF {remainingApps.length}</div>
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
                        disabled={numYeses <= 0 || submitStatus}
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
                        disabled={numYeses <= 0 || submitStatus}
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
                    onClick={handleNext}
                  >
                    NEXT
                  </button>
                  <button
                    className="vote-button"
                    style={{ backgroundColor: "#CACACA" }}
                    onClick={handleBack}
                  >
                    BACK
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
    lockApplications: state.mainReducer.lockApplications,
    decisions: state.mainReducer.decisions,
    remainingApps: state.mainReducer.remainingApps,
    reviewerName: state.mainReducer.name,
    numYeses: state.mainReducer.numYeses,
    commentsMap: state.mainReducer.commentsMap,
    flagsMap: state.mainReducer.flagsMap,

  };
};

export default connect(mapStateToProps)(Applications);
