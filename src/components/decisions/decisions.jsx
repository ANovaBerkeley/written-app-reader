import React, { Component } from "react";
import "./decisions.css";
import "../../global.js";

class Decisions extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: add state variables
      userDecisions: null,
      error: null,
    };
  }

  async componentDidMount() {
    const result = await this.fetchDecisions(this.props.reviewerName);
    console.log(result);
  }

  async fetchDecisions(reviewerName) {
    const formula = "?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22"
    const r = await fetch(global.DECISIONS_URL + formula + reviewerName + "%22&view=Grid%20view", {
      headers: {
        Authorization: "Bearer " + global.AIRTABLE_KEY
      }
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({
          userDecisions: result.records,
        });
      }, (error) => {
        this.setState({
          error,
        });
      });
    console.log(r, this.state.userDecisions);
    return true;
  }

  /** 
   * Formats field responses
   * for multiple select questions like "Which programming languages do you know?", converts Object [a,b,c] to "a, b, c"
   * @param {Object} entry: field response to be formatted (can be string or Object[])
  */
  formatFieldResponse(entry) {
    return (typeof(entry) !== "string") ? Array.from(entry).join(", ") : entry;
  }

  handleClick() {
    console.log('Clicked button');
  }

  renderListItem(fields) {
    const peekFields = ["Applicant Name", "Reviewer Name", "Interview", "Flag", "Comments"];
    return (
      <button className="d-button" onClick={this.handleClick()}>
        <table className="d-table">
          <tbody>
            <tr>
              {peekFields.map((value, index) => {
                return <td key={index} className="d-td">{fields[value]}</td>
              })}
            </tr>
          </tbody>
        </table>
      </button>
    );
  }

  renderListView(decisionRecords) {
    return (
      <div className="d-listview">
        {decisionRecords.map((fields) => {
          return this.renderListItem(fields);
        })}
      </div>
    );
  }

  /** Manual approach, user filters by their own name :< */
  renderIFrame() {
    const formula = "?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22";
    console.log(this.props.reviewerName, encodeURI(this.props.reviewerName))
    const url = "https://airtable.com/embed/shrQBEqBc9qbZV7NU" + formula + this.props.reviewerName + "%22&view=Grid%20view&backgroundColor=blue&viewControls=on";
    return (
        <iframe 
          className="airtable-embed" 
          src={url}
          frameBorder="0"
          width="100%" 
          height="533" 
          style={{"background": "transparent", "border": "1px solid #ccc"}}>Decisions</iframe>
    );
  }

  render() {
    if (this.state.userDecisions) {
      const listview = this.renderListView(this.state.userDecisions);
      return (
        <div className="md-body">
          <h2>App Decision History for {this.props.reviewerName}</h2>
          {listview}
        </div>
      );
    }
    return null;
  }
}

export default Decisions