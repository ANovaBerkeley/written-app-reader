import React from "react";
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
      <div className="app-question" key={i}>
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
  const { currentApp } = props;
  const fields = currentApp.fields;

  const orderedFields = orderFields(fields);
  return orderedFields.map((i) => <AppLine fields={fields} i={i} key={i} />);
};

export default Application;
