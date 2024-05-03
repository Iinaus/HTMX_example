# HTMX example

## Table of contents
- [About](#about)
- [Getting started](#getting-started)
  - [Dependencies](#dependencies)
  - [Dev setup step-by-step](#dev-setup-step-by-step)

## About

This is the code from an online [HTMX tutorial on YouTube](https://www.youtube.com/watch?v=0UvA7zvwsmg). It originally uses a Node.js/Express server. All of the HTMX code is contained within the `/public` .html files.

The tutorial covers various examples:

- `users.html`: Simple example of how to trigger events, make requests, set targets, etc
- `temperature.html`: Simple temperature converter
- `polling.html`: Example of polling (making a request every x seconds) using a mock weather api
- `search.html`: A contact search widget
- `searchFromApi.html`: A contact search widget connected to jsonpalceholder API
- `validation.html`: Inline validation example

Additionally, I've independently added the following examples:
- `test.html`: Coming soon

## Getting started

Instructions on how to set up the project.

## Dependencies

This project relies on the following dependencies:

- **Node.js**: A JavaScript runtime environment required to execute the server-side code.
- **express**: To handle HTTP requests and routes.
- **nodemon**: Utility that automatically restarts the server when changes are detected in the code.

Ensure that you have Node.js installed on your system before running this project. You can download and install Node.js from [here](https://nodejs.org/). Make sure to install other dependencies before running the project to ensure smooth execution.

### Dev setup step-by-step

1. Install dependencies with command `npm install`
2. Run the project with command `npm run dev`
3. Visit the html page at [http://localhost:3000/](http://localhost:3000/) to navigate further