// For global variables.
// The global scope in React Native is variable global.
// For ex: as global.foo = foo, then you can use global.foo anywhere as a global variable.
// Make sure you import './global.js' in your files to use global variables!
import { BASE_ID } from "./secrets.js"

global.APPLICATIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/All%20Applications"; // Applications airtable link
global.DECISIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/Decisions"; // Decisions airtable link

global.OFFICERS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/Officers"; // Ofiicers  airtable link

global.IGNORED_FIELDS = ["Name", "Email", "Year", "Phone Number", 
                        // bandaid fixes fall 21
                         "How did you hear about us?",
                         "Can you attend Orientation on Friday 9/24 from 6 PM - 8 PM? (mandatory for new members)",
                         "Which of these classes have you completed or are you currently taking?",
                         "Can you attend General Meetings on Tuesdays 7-8 PM?",
                         "Interview Availabilities",
                         "Please indicate ALL your site teaching availabilities.",
                         "Created",
                         "Officers",
                         "Do you have any questions or comments for us?",
];
