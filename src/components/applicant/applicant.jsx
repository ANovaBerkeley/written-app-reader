import React from "react";
import { connect } from "react-redux";

import "./applicant.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";
import { handleErrors, orderFields } from "../../utils/helpers";
import { AIRTABLE_KEY } from "../../secrets.js";

const Applicant = (props) => {
  const { verified, allApplications } = props;
  const queryParameters = new URLSearchParams(window.location.search);
  const applicantIndex = queryParameters.get("id");
  const currentApplicant = allApplications[applicantIndex];
  const [decisions, setDecisions] = React.useState([]);

  React.useEffect(
    () => {
        const formula = "?filterByFormula=%7BApplicant%20Name%7D%20%3D%20%20%22";
        console.log(global.DECISIONS_URL + formula + encodeURIComponent(currentApplicant.fields["Name"]) + "%22&view=Grid%20view");
        fetch(global.DECISIONS_URL + formula + encodeURIComponent(currentApplicant.fields["Name"]) + "%22&view=Grid%20view",
            {
                headers: {
                Authorization: "Bearer " + AIRTABLE_KEY,
                },
            })
            .then(handleErrors)
            .then((filteredDecisions) => {
                setDecisions(filteredDecisions.records);
            })
    }, [])

  console.log(decisions);

  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    if (decisions.length == 0) {
        return (<NavBar page="applications" />)
    }
    const orderedFields = orderFields(currentApplicant.fields);
    return (
      <>
        <NavBar page="applications" />
        <div className="applicants">
          <div className="applicant-section">
              <div className="applicant-view">
                <h2 id="applicant-name">{currentApplicant.fields["Name"]}</h2>
                {Object.keys(orderedFields).map(index => (
                  <>
                      <p><b>{orderedFields[index]}</b></p>
                      <p>{currentApplicant.fields[orderedFields[index]]}</p>
                  </>
                ))}
              </div>
          </div>
          <div className="applicant-decisions">
            <h2>Decisions</h2>
            {decisions.map(decision => (
                <>
                    <div className="applicant-decision">
                        <h3>
                            {decision.fields["Reviewer Name"]}
                            {" "}
                            {/* {decision.fields["Interview"] === "Yes" &&
                            <span role="img" aria-label="interview">
                                &#9989;
                            </span>}
                            {decision.fields["Interview"] === "No" &&
                            <span role="img" aria-label="interview">
                                &#10060;
                            </span>}
                            {" "}
                            {decision.fields["Interview"] === "No" &&
                            <span role="img" aria-label="interview">
                                &#128681;
                            </span>} */}
                        </h3>
                        <p>Written Score: {decision.fields["Interview"]}</p>
                        <p>Flag: {decision.fields["Flag"]}</p>
                        <p>Comments: {decision.fields["Comments"]}</p>
                    </div>
                </>
            ))}
          </div>
        </div>
        </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
    allApplications: state.mainReducer.allApplications,
  };
};

export default connect(mapStateToProps)(Applicant);