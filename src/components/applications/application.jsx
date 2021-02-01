import React from "react";
import { connect } from "react-redux";
import { formatFieldResponse, orderFields } from "../../utils/helpers";

/**
 * @param {*} props: {fields: dict of app fields
 *                    i: index}
 */
const AppLine = (props) => {
  const { fields, i } = props;

  const fieldResponse = formatFieldResponse(fields[i]);
  if (!global.IGNORED_FIELDS.includes(i)) {
    // certain fields removed to eliminate app reader bias
    return (
      <div>
        <p className="app-field">
          <b>{i}</b>
        </p>
        <p className="app-response">{fieldResponse}</p>
      </div>
    );
  } else {
    return null;
  }
};

/**
 * @param {*} props: {currentApp: {createdTime: string
 *                                 fields: dict of app fields
 *                                 id: string}}
 */
const Application = (props) => {
  const { remainingApps, currentApp } = props;
  const fields = currentApp.fields;

  const orderedFields = orderFields(fields);
  const appLines = orderedFields.map((i) => (
    <AppLine fields={fields} i={i} key={i} />
  ));
  return (
    <>
      <div className="header">
        <h1 className="header-application">Application</h1>
        <div className="header-stats">
          {remainingApps.length} APPS REMAINING
        </div>
      </div>
      <div>{appLines}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    remainingApps: state.mainReducer.remainingApps,
  };
};

export default connect(mapStateToProps)(Application);
