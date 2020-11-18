# Go1 Full-stack Developer Test - Justin Marrington

This is my implementation for Go1's full-stack developer test.

The basic application is a Node.js/Express API server, backed by MongoDB, with
Pelias for address geocoding and autofill. The UI is built in React, bootstrapped
with create-react-app.

## Getting started

This test application runs as a set of bridged docker containers.
To get started, first bootstrap the Pelias geocoder containers, then start
the web application container.

```bash
# Sets up the Pelias project and bootstraps Australian address data
# WARNING: this will take a while, and you should give it as much RAM and CPU
# as you can. My 64GB 10-core machine took about 60 minutes to index all of
# the address data into elasticsearch
bin/bootstrap

# Builds and starts the web application
docker-compose up -d
```

Once the application is running in Docker, access the UI via `http://localhost:3080`

## Reviewing the Code

## Running the tests

There are unit tests and integration tests for both the API endpoints and React
UI. You can run both suites via yarn - no need to run in docker, since the
external dependencies are mocked in test. Tests are written at the integration
level where possible, with Jest + supertest on the server, and
Jest + react-testing-library on the client.

```bash
yarn test
```

## Coverage

Generate a coverage report for my test coverage via Jest's test coverage
reporter.

```bash
yarn test -- --coverage
```
