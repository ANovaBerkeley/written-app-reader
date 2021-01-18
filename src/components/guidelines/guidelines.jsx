import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
import "./guidelines.css";
import "../../global.js";

const pagecontent = global.INSTRUCTIONS;

class Guidelines extends Component {
  constructor() {
    super();
    this.state = {
      // add state
    };
  }

  render() {
    return <Markdown className="md-body" children={pagecontent} />;
  }
}

export default Guidelines;
