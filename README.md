# Brew Ninja TypeScript/React Developer / Engineer - Take Home Test

This project is for candidates applying to a front-end engineering position at Brew Ninja. The goal of this test is to assess your knowledge of both *TypeScript* and *React*, and give us talking points for the interview (if we proceed to that step).
There's no time limit, but we suggest a 60-90 minutes timeframe for your solution. We are trying to be respectful of your time.

## Project Information

### Summary

You will be creating a single page application for managing contacts, starting from an existing project. Managing contacts means that a user can list/add/edit/delete contacts.

### Instructions

1. Fork this repository.
1. Code to satisfy the requirements (see below).
1. Notify your point of contact at Brew Ninja that you have completed the task, with a link to your fork.

### Constraints

- Do not add any package to the project, please work with the supplied NPM modules only.
- This project was created using CRA, and we would like to stick to that for running and testing the application.
- Time does not allow for building units tests yielding 100% code coverage; however, you may add unit tests where you feel it helps validate your solution.
- Manipulation of the collection of contacts should only use *contacts api module* which can be imported where needed:
  `import {apiAddContact, apiDeleteContact, apiFetchAllContacts, apiUpdateContact, IContact} from "src/data/contacts";`

### Requirements

- Users should be able to *add* new contacts.
- Each contact should have an *Universally Unique IDentifier* (provided function)
- Home page should display a collection of contacts with their details.
- Details for each contact should be:
  - Name
  - Phone number
  - Email
  - Age
- Contacts should be ordered by Name.
- Users should be able to *edit* a contact from the collection
- Users should be able to *delete* a contact from the collection
- Changes to the collection of contacts should persist

### Considerations

If you progress to the interview stage you will be asked about your solution and will have a chance to explain your thought process, what you would have done with more time, as well questions about specific decisions.

_Happy coding!_

## Create React App Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
