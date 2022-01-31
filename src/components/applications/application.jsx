import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { formatFieldResponse, orderFields } from "../../utils/helpers";
import { AIRTABLE_KEY, NUM_YES } from "../../secrets.js";
import { updateRemainingApps, updateNumYeses } from "../../store/actions";
import { shuffle, handleErrors } from "../../utils/helpers";

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
  const { remainingApps, currentApp, reviewerName, dispatch } = props;
  const fields = currentApp.fields;

  const orderedFields = orderFields(fields);
  const appLines = orderedFields.map((i) => (
    <AppLine fields={fields} i={i} key={i} />
  ));

  const getDecisionsData = async () => {
    const formula = "?filterByFormula=%7BReviewer%20Name%7D%20%3D%20%20%22";
    const decisions = await fetch(
      global.DECISIONS_URL + formula + reviewerName + "%22&view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer " + AIRTABLE_KEY,
        },
      }
    )
      .then(handleErrors)
      .then((result) => result.records)
      .catch((error) => {
        console.log("error fetching decisions data");
        console.log(error);
        throw error;
      });
    return decisions;
  };

  const getOfficersData = async () => {
    const formula = "?filterByFormula=%7BName%7D%20%3D%20%20%22";
    const officers = await fetch(
      global.OFFICERS_URL + formula + reviewerName + "%22&view=Grid%20view", 
    {
      headers: {
        Authorization: "Bearer " + AIRTABLE_KEY,
      },
    }
  )
    .then(handleErrors)
    .then((result) => result.records)
    .catch((error) => {
      console.log("error fetching officers data");
      console.log(error);
    });
    return officers;
  };

  const getApplicationsData = async (officers, decisions) => {
    fetch(global.APPLICATIONS_URL + "?view=Grid%20view", {
      headers: {
        Authorization: "Bearer " + AIRTABLE_KEY,
      },
    })
      .then(handleErrors)
      .then((result) => {
        console.log("result:", Object.keys(result.records));
        const yeses =
          NUM_YES -
          decisions.filter((r) => r.fields["Interview"] === "Yes").length;
        dispatch(updateNumYeses(yeses));

        let reviewerApps = (officers.map((r) => r.fields["All Applications"]));
        let remaining = result.records.filter(
          (r) => ((!decisions.map((r) => r.fields["ID"]).includes(r.id)) && reviewerApps[0].includes(r.id)) 
        );

        remaining = shuffle(remaining);
        console.log("updating remaining apps");
        console.log(remaining);
        dispatch(updateRemainingApps(remaining));
      })
      .catch((error) => {
        console.log("error fetching applications data");
        console.log(error);
        throw error;
      });
  };

  /**
   * Updates state variables to reflect current Airtable state,
   * To find all applications a reviewer has yet to vote on:
   * (1) GET from Decision Table, filter by Reviewer Name
   * (2) GET from All Applications Table
   * from (2) remove all records with matching IDs in (1)
   */
  /**
   * Updates state variables to reflect current Airtable state,
   * To find all applications a reviewer has yet to vote on:
   * (1) GET from Decision Table, filter by Reviewer Name
   * (2) GET from All Applications Table, filter by Officers
   * from (2) remove all records with matching IDs in (1)
   */
  const airtableStateHandler = async () => {
    try {
      const decisions = await getDecisionsData();
      const officers = await getOfficersData();
      await getApplicationsData(officers, decisions);
    } catch {
      toast.error("Failed to refresh", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="header-application">Application</h1>
        <div className="header-right">
          <div className="header-stats">
            {remainingApps.length} APPS REMAINING
          </div>
          <button
            className="vote-button"
            id="refresh-button"
            style={{ backgroundColor: "#248487", color: "#FFFFFF" }}
            onClick={() => {
              airtableStateHandler();
              window.scrollTo(0, 0);
            }}
          >
            REFRESH APPS
          </button>
          {/* {error && <div className="refresh-error">{error}</div>} */}
        </div>
      </div>
      <div>{appLines}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    remainingApps: state.mainReducer.remainingApps,
    reviewerName: state.mainReducer.name,
  };
};

export default connect(mapStateToProps)(Application);
