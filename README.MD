# Alacrity Platform Engineering Task

This repository is a solution of a task defined in [PDF](doc/Alacrity_Platform_Engineering_Task.pdf).

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [API](#api)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js v12](https://nodejs.org/en/) or if you have [NVM](https://github.com/nvm-sh/nvm), run `nvm use` in project root directory.
- Install [Yarn](https://yarnpkg.com/lang/en/)

# Getting started
- Clone the repository
```
git clone git@github.com:krymen/alacrity-assignment.git
```
- Install dependencies
```
cd alacrity-assignment
yarn install
```
- Build and run the project
```
npm run build
npm start
```

The app is available on http://localhost:3000.

- You may set `PORT` environment variable to change the default `3000` port
```
PORT=3001 npm start
```

- To run the application in development mode
```
npm run start:dev
```

# Running tests
Tests are written in [Jest](https://jestjs.io/). Run all the tests by:
```
npm test
```

# API
The API consists of two endpoints to store and retrieve a value. All the endpoints are decribed in [E2E tests](test/e2e).
