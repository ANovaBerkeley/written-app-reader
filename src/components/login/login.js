import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./login.css";
import "../../global.js";
import Logo from "../../static/logo.png";
import { login } from "../../store/actions";

const Login = (props) => {
  const { dispatch, verified } = props;
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const submitForm = () => {
    if (!global.OFFICERS.includes(name) || key != "993342") {
      setError("Invalid Credentials");
      return;
    } else {
      dispatch(login(name));
      history.push("/app-reader-test-deploy/guidelines");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="page">
      <img src={Logo} alt="ANova" className="logo" />
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <h2 style={{ marginTop: 0 }}>
            Welcome to the ANova Written App Reader!
          </h2>
          <Form.Group className="form-item" size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="form-input"
              autoFocus
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-item" size="lg" controlId="key">
            <Form.Label>Security Key</Form.Label>
            <Form.Control
              className="form-input"
              type="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </Form.Group>
          <Button
            className="form-button"
            block
            size="lg"
            type="submit"
            // disabled={!validateForm()}
            onClick={submitForm}
          >
            Login
          </Button>
        </Form>

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("STATE");
  console.log(state);
  return {
    name: state.mainReducer.name,
    verified: state.mainReducer.verified,
  };
};

export default connect(mapStateToProps)(Login);
