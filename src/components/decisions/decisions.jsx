import React from "react";
import { connect } from "react-redux";
import "./decisions.css";
import "../../global.js";
import { Redirect } from "react-router-dom";
// import NavBar from "../navbar/navbar";

const Decisions = (props) => {
  const { verified } = props;
  if (!verified) {
    return (<Redirect from="" to="/app-reader-test-deploy/login"/>);
  } else {
    return (
      <>
        {/* <NavBar page="decisions" /> */}
        <div className="md-body">
          <h2>App Decision History</h2>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verified: state.mainReducer.verified,
  };
};

export default connect(mapStateToProps)(Decisions);