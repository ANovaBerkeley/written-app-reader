# ANova Application Reader 2.0 🎉
This reader is made to be used by officers to read written applcations during recruitment, with a new and improved UI!

## [For Officers] Running the Reader 💻
1. In your terminal, clone the repo: `git clone  https://github.com/ANovaBerkeley/written-app-reader.git`
2. Navigate into the repo: `cd written-app-reader`
3. Make sure you have Node.js installed: https://nodejs.org/
4. Download all the necessary dependencies: `npm i && cd src && npm i`
5. Make sure you're in the `src` folder. Place `secrets.js` in the `src` folder, which you should have received from Exec.
6. Run `npm start`, which will open the app reader at http://localhost:3000. If there’s something already running on port 3000, just hit ‘Y’ when terminal prompts you.
7. Enter your name and secret key (which can be found in `secrets.js`), and get reading!

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

## Linking the Reader with Airtable
The reader uses the Airtable API to read the responses from the application, and write to a new table called Decisions.

### [For Exec] Creating a new Workspace and Base
1. Login to the ANova Airtable and create a new Workspace with the semester and year as the title. (e.g. Spring 2020)
2. Create a new Airtable base from scratch. This will create a new table in `Grid` view called `Table 1`. On the bottom left under "Create a view", add a `Form` view and input the current semester's interview questions.
3. Rename `Table 1` to `All Applications`.
4. Create a new empty table in this base called `Decisions` with the columns `Applicant Name`, `Reviewer Name`, and `Interview`.
5. Now, go to `https://airtable.com/api` and click on the current semester's base. Copy the hash in the Introduction that says, "The ID of this base is app________".
6. Go to `https://airtable.com/account` and copy the API key.
7. Create a `secrets.js` file. Copy the code block below and paste it into your `secrets.js` file, and replace the variable values with the correct API key, the base ID, the semester secret officers will use to login, a list of officers for this semester, and the number of yeses each officer has. An example `secrets.js` file is:
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
```
8. Never commit the `secrets.js` file. Instead, DM it to the officers directly (in Slack or whatever). 
9. You should be ready to go 🥳 Happy Recruitment!