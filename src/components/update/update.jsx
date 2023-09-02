import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import "./update.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";
import { handleErrors } from "../../utils/helpers";
import { updateDecisions, updateNumYeses } from "../../store/actions";
import { AIRTABLE_KEY, NUM_YES } from "../../secrets.js";
import { Link } from "react-router-dom";
import { orderFields } from "../../utils/helpers";

const Update = (props) => {
  const { dispatch, verified, numYeses, lockApplications, decisions } = props;
  const queryParameters = new URLSearchParams(window.location.search);
  const decisionId = queryParameters.get("id");
  const [applicationContent, setApplicationContent] = React.useState(null);
  const [decisionContent, setDecisionContent] = React.useState(null);
  const [flag, setFlag] = React.useState("No");
  const [vote, setVote] = React.useState("No");
  const [comments, setComments] = React.useState("");

  const airtableUpdateVote = async (new_vote, new_flag, new_comments) => {
    if (!lockApplications) {
      toast.error("Decision cannot be changed after unlocking all applications", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      })
      return;
    }
    await fetch(global.DECISIONS_URL + `/${decisionId}`, {
      body: JSON.stringify({"fields": {
        "Interview": new_vote,
        "Flag": new_flag,
        "Comments": new_comments
      }}),
      headers: {
        Authorization: "Bearer " + AIRTABLE_KEY,
        "Content-Type": "application/json",
      },
      method: "PATCH"
    })
      .then(handleErrors)
      .then((result) => {
        toast("Successfully updated decision!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });

        decisions.find((d, i) => {
          if (d.id === decisionId) {
            if (d.fields.Interview != new_vote) {
              if (new_vote === "Yes") {
                dispatch(updateNumYeses(numYeses - 1));
              } else {
                dispatch(updateNumYeses(numYeses + 1));
              }
            }
            decisions[i] = result;
          }
        })
        dispatch(updateDecisions(decisions));
      })
      .catch((error) => {
        toast.error("Unable to update decision", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  }

  React.useEffect(
    () => {
        fetch(global.DECISIONS_URL + `/${decisionId}?api_key=${AIRTABLE_KEY}`)
        .then(handleErrors)
        .then((decision) => {
            fetch(global.APPLICATIONS_URL + `/${decision.fields["Link to application"][0]}?api_key=${AIRTABLE_KEY}`)
                .then(handleErrors)
                .then((application) =>{
                    setDecisionContent(decision);
                    setApplicationContent(application);
                    setFlag(decision.fields.Flag);
                    setVote(decision.fields.Interview);
                    setComments(decision.fields.Comments);
                });
        });
    }, [])

  const voteYesColor = vote == "Yes" ? "#9AFFB0" : "";
  const voteNoColor = vote == "No" ? "#FF9393" : "";
  const flagYesColor = flag == "Yes" ? "#9AFFB0" : "";
  const flagNoColor = flag == "No" ? "#FF9393" : "";

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    if (applicationContent == null || decisionContent == null) {
        return (<NavBar page="decisions" />)
    }
    const orderedFields = orderFields(applicationContent.fields);
    const readProgress = {
      width: String((NUM_YES - numYeses) / NUM_YES * 100) + "%",
    };
    return (
      <>
        <NavBar page="decisions" />
        <div className="updates">
          <div className="update-section">
              <div className="update-view">
                <h2 id="applicant-name" style={lockApplications ? {color: "transparent", textShadow: "0 0 15px #000", userSelect: "none"} : {}}>
                  {decisionContent.fields["Applicant Name"]}
                </h2>
                {Object.keys(orderedFields).map(index => (
                  <>
                      <p><b>{orderedFields[index]}</b></p>
                      <p>{applicationContent.fields[orderedFields[index]]}</p>
                  </>
                ))}
              </div>
          </div>
          <div className="update-options">
                <div>
                  <div className="header-stats">{numYeses} YESES REMAINING</div>
                  <div class="progress-bar-empty">
                    <div class="progress-bar-full" style={readProgress}></div>
                  </div>
                  <h4 className="comments-label">Comment:</h4>
                  <textarea
                    id="comments-textbox"
                    className="update-comments-textbox"
                    name="app"
                    type="text"
                    value={comments}
                    onChange={event => setComments(event.target.value)}
                  ></textarea>
                  <h4>Vote:</h4>
                  <div className="update-buttons">
                      <button
                        className="update-button"
                        style={{ backgroundColor: voteYesColor }}
                        disabled={numYeses <= 0 && vote === "No"}
                        onClick={() => {
                          setVote("Yes");
                          console.log(vote);
                        }}
                      >
                        YES
                      </button>
                      <button
                        className="update-button"
                        style={{ backgroundColor: voteNoColor }}
                        onClick={() => {
                          setVote("No");
                        }}
                      >
                        NO
                      </button>
                  </div>
                  <h4>Flag:</h4>
                  <div className="update-buttons">
                    <button
                      className="update-button"
                      style={{ backgroundColor: flagYesColor }}
                      onClick={() => {
                        setFlag("Yes");
                      }}
                    >
                      YES
                    </button>
                    <button
                      className="update-button"
                      style={{ backgroundColor: flagNoColor }}
                      onClick={() => {
                        setFlag("No");
                      }}
                    >
                      NO
                    </button>
                  </div>
                  <div className="submit-buttons">
                    <Link
                      to="/app-reader-test-deploy/decisions"
                    >
                      <button
                        className="update-button"
                      >
                        CANCEL
                      </button>
                    </Link>
                    <button
                      className="update-button"
                      style={{ backgroundColor: "#248487", color: "white" }}
                      onClick={() => airtableUpdateVote(vote, flag, comments)}
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
    numYeses: state.mainReducer.numYeses,
    lockApplications: state.mainReducer.lockApplications,
    reviewerName: state.mainReducer.name,
    decisions: state.mainReducer.decisions
  };
};

export default connect(mapStateToProps)(Update);