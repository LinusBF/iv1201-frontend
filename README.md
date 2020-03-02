# Application Platform Front-End
This project contains the front-end of a fictive job application platform.  It was created as part of a school-project at KTH.

## Motivation
The project contains two repo's; this one and one for a backend meta-server running on Google's Cloud Run infrastructure.
This project contains a React-app for the client-side as well as a Express JS serverside for making API calls to the previously mentioned backend.
The project is built in a Node.JS environment using Yarn as package manager.

**Technologies**
- Environment: Node JS
- Package manager: Yarn
- Test frameworks: Chai, Proxyquire
- Hooks: Husky
- Linter: ES Lint
- Code formatter: Prettier JS
- Vulnerability checker: Snyk
  
### Client-side
The client-side is built using React. The client handles both "admin users" and "applicants". State is managed using Redux and React. Form validation is done using Formik.js and React-form-with-constraints. React handles all routing that is not registered at part of the front-end serverside calls, such as GET and POST requests to the server.

**Technologies** 
 - Front-end frameworks: React
 - HTTP client: Axios
 - Styling framework: Bootstrap for React
 - State management: React-Redux, React
 - Form validation: Formik, React-forms-with-constraints
 - Routing: React-router-dom
 - User front-end authentication: Firebase Web SDK
 

### Server-side
The server-side is built using Express. It's main responsibility is to act as communicator with the backend meta-server.

**Technologies** 
 - Web application framework: Express JS
 - User backend authentication: Firebase Auth

## Package manager commands

```
yarn dev    //Run local development
yarn test   //Run tests
yarn add    //Add dependancies

//Husky hooks connected
"pre-commit": "lint-staged && snyk test && yarn test",
"post-merge": "yarn install"
```