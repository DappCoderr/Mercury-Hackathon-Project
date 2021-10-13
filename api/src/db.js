import { knex } from "knex";
const path = require("path");

const { Model } = require("objection");

const initDB = config => {
  const knexInstance = knex({
    client: "postgresql",
    connection: {
      host: "localhost",
      user: "postgres",
      database: "mercury-hackathon"
    },
    pool: {
      min: 2,
      max: 10
    },
    acquireConnectionTimeout: 10000,
    migrations: {
      directory: path.join(__dirname, "migrations")
    }
  });

  Model.knex(knexInstance);

  return knexInstance;
};

export default initDB;
