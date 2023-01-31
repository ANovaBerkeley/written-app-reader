// For global variables.
// The global scope in React Native is variable global.
// For ex: as global.foo = foo, then you can use global.foo anywhere as a global variable.
// Make sure you import './global.js' in your files to use global variables!
import { BASE_ID } from "./secrets.js"

if (process.env.REACT_APP_DEV) {
  const TEST_BASE_ID = "appvwWqjOPkyIULfE"
  global.APPLICATIONS_URL =
    "https://api.airtable.com/v0/" + TEST_BASE_ID + "/All%20Applications";
  global.DECISIONS_URL =
    "https://api.airtable.com/v0/" + TEST_BASE_ID + "/Decisions";

  global.OFFICERS_URL =
    "https://api.airtable.com/v0/" + TEST_BASE_ID + "/Officers";
} else {
  global.APPLICATIONS_URL =
    "https://api.airtable.com/v0/" + BASE_ID + "/All%20Applications"; // Applications airtable link
  global.DECISIONS_URL =
    "https://api.airtable.com/v0/" + BASE_ID + "/Decisions"; // Decisions airtable link

  global.OFFICERS_URL =
    "https://api.airtable.com/v0/" + BASE_ID + "/Officers"; // Ofiicers  airtable link
}

global.IGNORED_FIELDS = ["Name", "Email", "Year", "Phone Number", "Officers"];

