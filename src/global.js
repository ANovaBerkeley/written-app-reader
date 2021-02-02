// For global variables.
// The global scope in React Native is variable global.
// For ex: as global.foo = foo, then you can use global.foo anywhere as a global variable.
// Make sure you import './global.js' in your files to use global variables!
import { BASE_ID } from "./secrets.js"

global.APPLICATIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/All%20Applications"; // Applications airtable link
global.DECISIONS_URL =
  "https://api.airtable.com/v0/" + BASE_ID + "/Decisions"; // Decisions airtable link

/** Specific to the process every semester */
global.IGNORED_FIELDS = ["Name", "Email", "Year", "Phone Number"];
global.QUESTION_ORDER = [
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  0,
  1,
  2,
  3,
  4,
  5, // based on ordering of airtable fields (optional)
];

// global.QUESTION_ORDER = [
//   5,
//   6,
//   7,
//   8,
//   4,
//   9,
//   10,
//   11,
//   12,
//   13,
//   14,
//   24,
//   25,
//   26,
//   27,
// ];

/** Guidelines page markdown content (change as needed) */
global.INSTRUCTIONS = `
# Recruitment guidelines
Please review this page for instructions, reminders, and tips on how to proceed app-reading. 
Although each officer brings his or her own unique perspective to the app-reading process, standardized app-reading criteria and expectations make the decision process smoother for everyone!

## Deadlines
- app reading is due by **DATE** at **TIME**
- the deliberations meeting will be in **LOCATION** from **7:00pm to 9:00pm** on **Friday**

### Mission Statement
Some things to look out for:

- is the candidate discussing ANova's actual mission? 
- do they make generalizations about our students and/or their backgrounds or communities? 
- is their response centered around themselves or around our service impact?
- do they have a desire to learn more about the communities we work with?
- etc. etc.

### Mentorship response
- do they have some understanding of the challenges and responsibilities of mentoring students?
- do they come off as open-minded, strict, self-centered, aloof, etc.?
- reading this app, would you anticipate that they'd adjust well to an ANova site?
- etc. etc.

### Structural inequality
- gauge how much they understand about inequality vs. inequity 
- gauge how much they know about different socioeconomic issues relating to education and beyond
- have they been active in assisting underresourced or marginalized communities?
- etc. etc.

### Site availability
- do they have at least 3 site times? If not, but the app is good, flag it and bring it up during delibs.
`;
