import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../static/logo.png";
import "./navbar.css";

const NavBar = (props) => {
  const { page } = props;

  return (
    <div className="navbar">
      <img src={Logo} alt="ANova" className="logo" />
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
      </div>
    </div>
  );
};

export default NavBar;
