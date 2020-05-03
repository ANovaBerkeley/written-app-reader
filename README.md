# app-reading made ez

## To Execs
This platform intends to be easy to use, modify, and build upon. For executives, each semester, update the `global.js` file in the `src` folder. Things to update in `global.js`:
- Officers' names
- Number of Yeses per officer
- Airtable Base ID
- This semester's secret password (any string or number)
- Semester guidelines (contains relevant dates, times, instructions for officers to remember, a rubric, etc.)
- (Optional) Instructions on how to reorder the application questions
- (Optional) List of questions to avoid showing the user (i.e. don't show Name, Year, Phone, Email to anonymize candidates)

## Making changes and redeploying:
1. Push the changes to master
2. Run `npm run deploy`
3. Wait ~30 seconds
4. Visit: https://adityavarshney.github.io/app-reader-test-deploy/

## How does a user access and use the app reader?
1. Visit: https://adityavarshney.github.io/app-reader-test-deploy/
2. When the prompt appears, enter your name as it is listed in the repo’s `src/global.js` file (`global.OFFICERS`) in the `master` branch.
3. Enter the semester password (also listed in the repo’s `src/global.js` file).
4. If you entered your name/password correctly and are in the list of known officers, you’ll be allowed to review apps.
5. Go ham! Your decisions will be submitted to the Airtable identified in the repo’s `src/global.js` file.

## How to run the App-Reader locally:
- Install Node.js with NPM
- Clone the repo
-- master: git clone https://github.com/saiyandapalli/ANova-App-Reader.git 
-- https://github.com/saiyandapalli/ANova-App-Reader/tree/master
-- Adi-branch: git clone -b adi-branch --single-branch https://github.com/saiyandapalli/ANova-App-Reader.git
-- https://github.com/saiyandapalli/ANova-App-Reader/tree/adi-branch
- Download the `global.js` file sent to you by exec
- Move this file to the `appreader/src/` directory in the repo
- Open terminal, navigate to the repo location (`cd ANova-App-Reader`)
- Enter the appreader folder (`cd appreader`)
- Run `npm install`
- Run `npm start`. This will start the appreader application on localhost port 3000. If there’s something already running on port 3000, no worries, just hit ‘Y’ when terminal prompts you.
- When the prompt appears, enter your name as it is listed in the repo’s `src/global.js` file (`global.OFFICERS`) in the `master` branch
- Enter the semester password (also listed in the repo’s `src/global.js` file).
- If you entered your name/password correctly and are in the list of known officers, you’ll be allowed to review apps.
- Go ham! Your decisions will be submitted to the Airtable identified in the repo’s `src/global.js` file.

### Resources Used:
- Remote deploy to gh pages: https://github.com/gitname/react-gh-pages
- React Basics: https://reactjs.org/tutorial/tutorial.html

## Available Scripts

The docs below are generic create-react-app commands. Use for testing. 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
