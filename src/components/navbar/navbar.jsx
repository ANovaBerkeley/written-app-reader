import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../static/logo.png";
import "./navbar.css";

import { logout } from "../../store/actions";

const NavBar = (props) => {
  const { dispatch, page } = props;

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <a href="/app-reader-test-deploy/guidelines">
        <img src={Logo} alt="ANova" className="logo" />
      </a>
      <div className="links">
        <Link
          id="guidelines"
          to="/app-reader-test-deploy/guidelines"
          className="link"
          style={{ color: page === "guidelines" ? "#4e4e4e" : "#b7b6b6" }}
        >
          Guidelines
        </Link>
        <Link
          id="apps"
          to="/app-reader-test-deploy/applications"
          className="link"
          style={{ color: page === "applications" ? "#4e4e4e" : "#b7b6b6" }}
        >
          Read Applications
        </Link>
        <Link
          id="decisions"
          to="/app-reader-test-deploy/decisions"
          className="link"
          style={{ color: page === "decisions" ? "#4e4e4e" : "#b7b6b6" }}
        >
          Decision History
        </Link>
        <div
          className="link"
          onClick={handleLogOut}
          style={{ color: "#b7b6b6" }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps)(NavBar);
