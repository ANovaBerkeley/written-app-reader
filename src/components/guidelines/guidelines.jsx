import React from "react";
import { connect } from "react-redux";
import "./guidelines.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
import NavBar from "../navbar/navbar";

import { NUM_YES } from "../../secrets";

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
            voting on each applicant from a scale of 1 to 4 on whether you’d 
            like the candidate to move forward to interviews. If you are unsure 
            of a candidate, you can select "Next/Back" to move through applications. 
            
            
            Comments will be required on applicants that you vote 1 / 2 on.
            If you forget to add a comment on an application,
            you can add it by clicking the edit button.
            You will not be able to see the applicants’names to maintain anonymity. 

            <b> You can 'Flag' candidates that you want to discuss about at deliberations. </b>
            Click on <b>Read Applications</b> to
            start!
          </p>

          <h2>Deadlines</h2>
          <ul>
            <li>
              Please refer to Exec for deadlines and delib logistics
            </li>
          </ul>

          <h2>Rubric</h2>
          <p>
            Please reference the 2025 recruitment guide on tips and tricks to read your apps: Here is the link to the
            <a href="https://www.notion.so/anova/Spring-2025-Officers-Only-18a89bcce3b2806e8f44ca2311ded097"> notion guide!</a>.
          </p>

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


          <h2>New Proposal Response</h2>
          <ul>
            <li>
              Is the proposal in benefit of the kids?
            </li>
            <li>
              Is the proposal non-generic and thoughtful?
            </li>
            <li>
              Did they do some research about our existing projects? (must be public)?
            </li>
            <li>
                Don't consider: feasibility of the proposal.
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