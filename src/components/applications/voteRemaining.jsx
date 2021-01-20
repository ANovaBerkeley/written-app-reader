import React from "react";
import { connect } from "react-redux";
import toaster from "toasted-notes"; // requires react-spring module! yarn add toasted-notes; npm install react-spring;

import "./applications.css";
import "../../global.js";
import { updateRemainingApps, updateNumYeses } from "../../store/actions";

const VoteRemaining = (props) => {
  const { dispatch, remainingApps, numYeses, reviewerName } = props;

  /** Votes "No" on the remaining apps once the user is out of yeses */
  const voteOnRemainingApps = async () => {
    document.getElementById("leftover-no-button").disabled = true;
    if (numYeses === 0) {
      console.log("Voting 'No' on remaining apps!");
      // mark remaining apps as "No"
      const records = remainingApps.map((app) => {
        let applicantName = app.fields["Name"];
        let vote = "No";
        let flag = "No";
        let comments = "";
        let id = app.id;
        return (
          '{"fields": {"Applicant Name": "' +
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
          '"}}'
        );
      });

      try {
        records.map((r) =>
          fetch(global.DECISIONS_URL, {
            body: '{"records": [' + r + "]}",
            headers: {
              Authorization: "Bearer " + global.AIRTABLE_KEY,
              "Content-Type": "application/json",
            },
            method: "POST",
          })
        );
        dispatch(updateRemainingApps([]));
        dispatch(updateNumYeses(0));
      } catch (err) {
        console.log("fetch failed [VOTE]", err);
      }
    }
    toaster.notify(
      <div className="done-toast">
        <h4 className="toast-text">All done! Great work!</h4>
      </div>,
      {
        position: "bottom",
        duration: null,
      }
    );
  };

  if (remainingApps.length > 0) {
    return (
      <div className="vote">
        <h3>No Yeses Remaining</h3>
        <button
          className="leftover-no-button"
          id="leftover-no-button"
          onClick={() => {
            voteOnRemainingApps();
          }}
        >
          Vote "No" on Remaining {remainingApps.length} Apps
        </button>
      </div>
    );
  } else {
    return (
      <div className="vote">
        <h3>No Apps to Review.</h3>
        <p>Visit the Airtable to make changes</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    remainingApps: state.mainReducer.remainingApps,
    numYeses: state.mainReducer.numYeses,
  };
};

export default connect(mapStateToProps)(VoteRemaining);
