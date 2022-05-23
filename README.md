# Angular - Tour of heroes app - JEST 100% code-coverage

###### Author: [Kristiyan Velkov](https://www.linkedin.com/in/kristiyan-velkov-763130b3/)

######  Documents:
- [Kristiyan Velkov - Presentation for Unit Testing](./docs/Kristiyan%20Velkov%20-%20Presentation%20for%20Unit%20Testing.pdf)
- [Kristiyan Velkov - Testing Different types](./docs/Kristiyan%20Velkov%20-%20Testing%20Different%20types.pdf)
- [Kristiyan Velkov - Kristiyan Velkov -Rules of unit testing](./docs/Kristiyan%20Velkov%20-RULES%20FOR%20UNIT%20TESTING.pdf)

## Table of contents

-   [Generate an application](#generate-an-application)
-   [Remove applications](#remove-applications)
-   [Generate a library](#generate-a-library)
-   [Development server](#development-server)
-   [Code scaffolding](#code-scaffolding)
-   [Build the application](#build)
-   [Running unit tests](#running-unit-tests)
-   [Understand your workspace](#understand-your-workspace)
-   [Further help](#further-help)

---

This project was generated using [Nx](https://nx.dev).

## Generate an application

Run `nx g @nrwl/angular:app my-app` to generate an application.

When using Nx, you can [generate](https://nx.dev/latest/angular/cli/generate) multiple applications and libraries in the same workspace.

## Remove applications

Run `nx g rm my-app`

## Generate a library

Run `nx g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@your-team/my-lib`.

## Development server

Run `nx serve my-app` for a dev server or `nx serve` for default app. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
By default, the app should run via webpack proxy (proxy.conf.json) targeting a remote API.

## Code scaffolding

Run `nx generate component my-component --project=my-app` to generate a new component.
Or simply `nx g c my-component` to generate it. Other Angular CLI commands also work.

## Build

Run `nx build my-app` to build the project or `nx build` for default app. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

Run `yarn lint:fix` to check the code style and possible to fix it

Run `yarn test-and-lint` to run tests and code style checks on CI

Run `yarn code-coverage` to generate coverage

Run `yarn bundle-analyze` to see the prod package files and what's inside them.

Run `yarn bundle-source-maps` for a similar view based on source-maps

On each commit linting will occur.

## Further help

If you have any questions or problems, please do not hesitate to contact me!

[Kristiyan Velkov](https://www.linkedin.com/in/kristiyan-velkov-763130b3/)
