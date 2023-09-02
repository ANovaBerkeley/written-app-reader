import React from "react";
import { connect } from "react-redux";
import "./decisions.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Table from "../table/table";

const Decisions = (props) => {
  const { verified, lockApplications, numYeses, decisions } = props;

  // I think this reruns a lot
  const decisionsList = [];
  for (let i = 0; i < decisions.length; i++) {
    const currentDecision = decisions[i];
    const fields = currentDecision.fields;
    const createdTimeString = new String(currentDecision.createdTime);
    const createdTimeDate = new Date(createdTimeString.slice(0, -5) + "Z");
    const decisionIdString = new String(currentDecision.id);
    decisionsList.push({
      id: fields["ID Num"],
      name: fields["Applicant Name"],
      created: createdTimeDate.toLocaleString(),
      interview: fields["Interview"],
      flag: fields["Flag"],
      comments: fields["Comments"],
      button: "/app-reader-test-deploy/update?id=" + decisionIdString
    })
  }

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    const column_names = ["ID", "Applicant Name", "Created Time", "Interview", "Flag", "Comments"];
    const column_ids = ["id", "name", "created", "interview", "flag", "comments"];
    const column_widths = ["5vw", "20vw", "15vw", "5vw", "5vw", ""];
    const blur_names = lockApplications;
    return (
      <>
        <NavBar page="decisions" />
        <div className="md-body">
          <div className="decision-headers">
            <h2>App Decision History</h2>
            <h3>Yeses Remaining: {numYeses}</h3>
          </div>
          <Table
            column_names={column_names}
            column_ids={column_ids}
            column_widths={column_widths}
            rows={decisionsList}
            button="Edit"
            blur_names={blur_names}
          />
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
    lockApplications: state.mainReducer.lockApplications,
    numYeses: state.mainReducer.numYeses,
    decisions: state.mainReducer.decisions
  };
};

export default connect(mapStateToProps)(Decisions);
