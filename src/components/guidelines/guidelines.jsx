import React from "react";
import { connect } from "react-redux";
import "./guidelines.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";

const Guidelines = (props) => {
  const { verified } = props;
  if (!verified) {
    return <Redirect from="" to="/app-reader-test-deploy/login" />;
  } else {
    return (
      <>
        <NavBar page="guidelines" />
        <div className="guidelines">
          <h1>Recruitment Guidelines</h1>
          <p style={{ fontSize: 18 }}>
            Please review this page for instructions, reminders, and tips on how
            to proceed app-reading. Although each officer brings his or her own
            unique perspective to the app-reading process, standardized
            app-reading criteria and expectations make the decision process
            smoother for everyone!
          </p>

          <h2>Instructions</h2>
          <p>
            You will be reading through all of the written applications, and
            voting “Yes” or “No” on whether you’d like the candidate to move
            forward to interviews. You are allowed to vote “Yes” for a maximum
            of 30 candidates. If you are unsure of a candidate, you can select
            “Skip” to come back to their application at the end. You can submit
            comments and/or flag a candidate if you want to discuss them further
            during delibs. If you would like to review your votes or make a
            change, you can do so under the <b>Decision History</b> tab. You
            will not be able to see the applicants’ names to maintain anonymity.
            Click on <b>Read Applications</b> to start!
          </p>

          <h2>Deadlines</h2>
          <ul>
            <li>
              App reading is due by <b>2/4 at 5PM PST</b>
            </li>
            <li>
              The deliberations meeting will be on <b>2/4 at 7PM PST</b> at{" "}
              <a href="berkeley.zoom.us/dslafhkjdah">
                berkeley.zoom.us/dslafhkjdah
              </a>
            </li>
          </ul>

          <h2>Mission Statement</h2>
          <p>Some things to look out for:</p>
          <ul>
            <li>Is the candidate discussing ANova's actual mission?</li>
            <li>
              Do they make generalizations about our students and/or their
              backgrounds or communities?
            </li>
            <li>
              Is their response centered around themselves or around our service
              impact?
            </li>
            <li>
              Do they have a desire to learn more about the communities we work
              with?
            </li>
          </ul>

          <h2>Mentorship Response</h2>
          <ul>
            <li>
              Do they have some understanding of the challenges and
              responsibilities of mentoring students?
            </li>
            <li>
              Do they come off as open-minded, strict, self-centered, aloof,
              etc.?
            </li>
            <li>
              Reading this app, would you anticipate that they'd adjust well to
              an ANova site?
            </li>
          </ul>

          <h2>Structural Inequality</h2>
          <ul>
            <li>How much do they understand about inequality vs. inequity?</li>
            <li>
              How much do they know about different socioeconomic issues
              relating to education and beyond?
            </li>
            <li>
              Have they been active in assisting underresourced or marginalized
              communities?
            </li>
          </ul>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
  };
};

export default connect(mapStateToProps)(Guidelines);
