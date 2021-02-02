// For global variables.
// The global scope in React Native is variable global.
// For ex: as global.foo = foo, then you can use global.foo anywhere as a global variable.
// Make sure you import './global.js' in your files to use global variables!
import { BASE_ID } from "./secrets.js"

global.APPLICATIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/All%20Applications"; // Applications airtable link
global.DECISIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/Decisions"; // Decisions airtable link

global.IGNORED_FIELDS = ["Name", "Email", "Year", "Phone Number"];
