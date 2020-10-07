# Calipsa Test API

This project is the Calipsa Test API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Nodejs >= v12
- Postgres database >= v9

### Installing

To start this app, perform the following steps in order

1. Run `npm install`
2. Create a `.env` file, using the `sample.env` file, edit the `.env` file to match your environment.

3. Run `node_modules/.bin/sequelize db:migrate`
4. Run `node_modules/.bin/sequelize db:seed:all`
5. Run `npm start`
--
