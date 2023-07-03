# Node backend for Maria Symphony Desktop

This project is a simple Node.js application with APIs that demonstrates the usage of MongoDB, mongoose, and node-persist for data persistence.

## What's Done in This Project

1. Set up a basic Node project with APIs.
2. Connect to a MongoDB database. For MongoDB, use docker-compose by running `docker-compose up -d` in the backend directory to start the database.
3. Utilize mongoose for MongoDB connectivity.
4. Employ node-persist for local data persistence.
5. To format the code, run `npm run format` in the backend directory.

## Prerequisites

- Node.js installed on your machine
- Docker installed (if you plan to use MongoDB with docker-compose)

## Getting Started

1. Navigate to the backend directory.
2. Install the dependencies by running the command `npm install`.
3. Start the MongoDB database by running `docker-compose up -d` (if using docker-compose).
4. Start the Node.js application by running `npm start`.
5. The APIs are now accessible on the specified port (e.g., `http://localhost:3000/api`).

## Code Formatting

To ensure consistent code formatting, run `npm run format` in the backend directory. This command will format the code using the specified configuration.
