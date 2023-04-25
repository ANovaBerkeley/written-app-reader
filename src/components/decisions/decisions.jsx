import React from "react";
import { connect } from "react-redux";
import "./decisions.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";
import { handleErrors } from "../../utils/helpers";
import { AIRTABLE_KEY } from "../../secrets.js";
import { Link } from "react-router-dom";

const Decisions = (props) => {
  const { verified, reviewerName, decisions } = props;

  const decisionRow = (decision) => {
    const fields = decision.fields;
    const createdTimeString = new String(decision.createdTime);
    const createdTimeDate = new Date(createdTimeString.slice(0, -5) + "Z");
    const decisionIdString = new String(decision.id);
    const updateRoute = "/app-reader-test-deploy/update?id=" + decisionIdString;
    return (
      <tr>
        <td>{fields["Applicant Name"]}</td>
        <td>{createdTimeDate.toLocaleString()}</td>
        <td>{fields.Interview}</td>
        <td>{fields.Flag}</td>
        <td>{fields.Comments}</td>
        <td>
          <Link
            id="decisions"
            to={updateRoute}
            className="link"
          >
          <img src={require("../../static/edit.png")} alt="edit" class="edit"></img>
          </Link>
        </td>
      </tr>
    );
  }

  const decisionTable = () => {
    const rows = [(
      <tr>
        <th>Applicant Name</th>
        <th>Last Updated</th>
        <th>Interview</th>
        <th>Flag</th>
        <th>Comments</th>
        <th>Edit</th>
      </tr>
    )];
    for (let i = 0; i < decisions.length; i++) {
      rows.push(decisionRow(decisions[i]));
    }
    return (<table class="decision-table">{rows}</table>);
  }

  console.log(reviewerName);
  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    return (
      <>
        <NavBar page="decisions" />
        <div className="md-body">
          <h2>App Decision History</h2>
          {decisionTable()}
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

export default connect(mapStateToProps)(Decisions);
