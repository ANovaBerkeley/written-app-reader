# ANova Application Reader 2.0 🎉

This reader is made to be used by officers to read written applcations during recruitment, with a new and improved UI!

## [For Officers] Running the Reader 💻

1. In your terminal, clone the repo: `git clone https://github.com/ANovaBerkeley/written-app-reader.git`
2. Navigate into the repo: `cd written-app-reader`
3. Make sure you have Node.js installed: https://nodejs.org/
4. Download all the necessary dependencies: `npm i && cd src && npm i`
5. Place `secrets.js` in the `src` folder, which you should have received from Exec.
6. If you have installed node recently, run this in your terminal before typing in `npm start`: `export NODE_OPTIONS=--openssl-legacy-provider` (If you skip this step and recieve an error, run this in the terminal).
7. Run `npm start`, which will open the app reader at http://localhost:3000. If there’s something already running on port 3000, just hit ‘Y’ when terminal prompts you.
8. Enter your name and secret key (which can be found in `secrets.js`), and get reading!

## Password to Unlock Applications

`berkeleyanova24`

## Updating the Reader for Recruitment 👩‍💻

There's two ways to contribute to this repo: Pull Requests or Contributing Directly.

### Pull Requests

1. Fork this repo to your own GitHub account.
2. Make any changes to the reader.
3. When you're done with your changes, create a pull request (aka a code review!). Someone in the ANova GitHub organization can then review your code, ask for revisions, correct any potential bugs, and then merge in your code.

### Contribute Directly (Not Recommended)

1. Ask a previous contributor to add you to the Berkeley ANova GitHub organization.
2. Clone this repo and make necessary changes. Try to keep the # of commits as low as possible to reduce clutter. (Tip: `git rebase`)
3. Push directly to master after testing thoroughly: `git push origin master`

## Testing the App

Since Fall 2022, we have set up a bare bones testing environment for developers to debug with in case there are any issues with the reader during recruitment. It pulls from the [Test base](https://airtable.com/appvwWqjOPkyIULfE/tblneqO4kcIozm98P/viw0VogHq7jpWdFzB?blocks=hide), which is currently an anonymized version of our Fall 2022 recruitment base. 

You will still need your `secrets.js` file that we include in setup!! 

If you decide to configure the fields in the `All Applications` table, make sure that you that you change the `QUESTION_ORDER` array that corresponds with the newly ordered fields. We should have included a commented out `QUESTION_ORDER` in the `secrets.js` file that is given to you. This configuration should work with the way the Test base is currently set up.

To activate this environment, run `npm run dev`

## Linking the Reader with Airtable

The reader uses the Airtable API to read the responses from the application, and write to a new table called Decisions. Ensure none of the values in airtable are empty (fill empty values with 'N/A') so that questions are displayed in the correct order while reading.

### [For Exec] Creating a new Workspace and Base

1. Login to the ANova Airtable and create a new Workspace with the semester and year as the title. (e.g. Spring 2020)
2. Create a new Airtable base from scratch. This will create a new table in `Grid` view called `Table 1`. On the bottom left under "Create a view", add a `Form` view and input the current semester's interview questions.
3. Rename `Table 1` to `All Applications`.
4. Create a new empty table in this base called `Decisions` with the columns `Applicant Name`, `Reviewer Name`, and `Interview`.
5. Now, go to `https://airtable.com/api` and click on the current semester's base. Copy the hash in the Introduction that says, "The ID of this base is app**\_\_\_\_**".
6. Go to `https://airtable.com/account` and copy the API key.
7. Create a `secrets.js` file. Copy the code block below and paste it into your `secrets.js` file, and replace the variable values with the correct API key, the base ID, the semester secret officers will use to login, a list of officers for this semester, the number of yeses each officer has, and the order you'd like the questions to appear in. An example `secrets.js` file is:

```
// For secret global variables.
export const AIRTABLE_KEY = "keyZ8W3ko0tHQO5zV"; // keep this secret

/** Change these every semester */
export const BASE_ID = "appm1EwjHL56mOmPx";
export const SEM_SECRET = "993342";
export const OFFICERS = [
  "Aditya Varshney",
  "Anna Gao",
  "Sai Yandapalli",
  "Hau Nguyen",
  "Andrew Lieu",
];

export const NUM_YES = 30;


/* FOR DEBUGGING PURPOSES ONLY - KEEP COMMENTED OUT */
// export const QUESTION_ORDER = [0, 2, 3, 4]

export const QUESTION_ORDER = [
 9, 8, 19, 18, 4, 6, 10, 11, 20,
];
```

8. Never commit the `secrets.js` file. Instead, DM it to the officers directly (in Slack or whatever).
9. You should be ready to go 🥳 Happy Recruitment!
