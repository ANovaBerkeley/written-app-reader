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
            voting “Yes” or “No” on whether you’d like the candidate to move
            forward to interviews. You are allowed to vote “Yes” for a maximum
            of {NUM_YES} candidates. If you are unsure of a candidate, you can
            select “Skip” to come back to their application at the end. 
            <b> Comments will not persist when you skip applications.
              Keep track of comments you make on apps you skip by writing down
              the app number and your comment on a separate document. </b> 
            When you make a decision on an application, your comment will be stored,
            and you won't need the document anymore. 
            Comments will be required on applicants that you vote "No" on.
            If you forget to add a comment on an application you vote "No" on,
            you can fill out this <a href="https://forms.gle/SqyL6nZw6NiF5bFk6"> 
            Google Form</a> (which is the same as the form to change your decision),
            but instead choose the option to just add a comment. 
            You will not be able to see the applicants’names to maintain anonymity. 
            You will see names briefly after voting on an application. 
            Click on <b>Read Applications</b> to
            start!
          </p>

          <p>
            Note: Currently, if you make a mistake in your votes, you have to 
            fill out this <a href="https://forms.gle/SqyL6nZw6NiF5bFk6"> 
            Google Form</a>.
            You will need the name or application ID of the application you are 
            changing your vote for. Again, for applications where you vote "No",
            make sure you provide a commment. Please vote carefully! If you manually
            change a vote, click the <b>Refresh Apps</b> button to update the
            apps.{" "}
          </p>

          <h2>Deadlines</h2>
          <ul>
            <li>
              App reading is due by <b>9/16 at 5PM PST</b>
            </li>
            <li>
              The deliberations meeting will be on <b>9/16 at 7:30PM PST</b> in Soda 606.
            </li>
          </ul>

          <h2>Rubric</h2>
          <p>
            Here are some of the guiding questions that were used in past semesters for
            application reading. Here is the link to the 
            <a href="https://docs.google.com/document/d/1Apvg7A5T1_fRN5ATZx8KvxNry8Ddkh0gMH7cRst-2Qk/edit?usp=sharing">
            Fall 2021 Written App Rubric</a>.
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
