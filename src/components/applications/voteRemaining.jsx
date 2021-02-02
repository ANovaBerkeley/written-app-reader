import React, {useState} from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import "./applications.css";
import "../../global.js";
import { AIRTABLE_KEY } from "../../secrets.js";
import { updateRemainingApps, updateNumYeses } from "../../store/actions";

const VoteRemaining = (props) => {
  const { dispatch, remainingApps, numYeses, reviewerName } = props;
  const [loading, setLoading] = useState(false)

  /** Votes "No" on the remaining apps once the user is out of yeses */
  const voteOnRemainingApps = async () => {
    setLoading(true)
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
              Authorization: "Bearer " + AIRTABLE_KEY,
              "Content-Type": "application/json",
            },
            method: "POST",
          })
        );
        dispatch(updateRemainingApps([]));
        dispatch(updateNumYeses(0));
      } catch (err) {
        console.log("Unable to vote no on remaining apps", err);
      }
    }
    toast("All done! Great work!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  if (remainingApps.length > 0) {
    return (
      <>
        <button
          className="vote-button"
          style={{ backgroundColor: "#FF9393" }}
          disabled={loading}
          onClick={() => {
            voteOnRemainingApps();
          }}
        >
          VOTE NO ON <br /> REMAINING APPS
        </button>
      </>
    );
  } else {
    return (
      <div>
        <h3>No Apps to Review.</h3>
        <p>Visit the Airtable to make changes.</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    remainingApps: state.mainReducer.remainingApps,
    numYeses: state.mainReducer.numYeses,
    reviewerName: state.mainReducer.name,
  };
};

export default connect(mapStateToProps)(VoteRemaining);
