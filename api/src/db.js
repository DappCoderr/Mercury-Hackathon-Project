import { knex } from "knex";
const path = require("path");

const { Model } = require("objection");
import config from "./config";

const initDB = () => {
  const knexInstance = knex({
    client: "postgresql",
    connection: {
      connectionString: config.databaseUrl,
      ssl:
        config.envMode === "production" ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10
    },
    acquireConnectionTimeout: 10000,
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  });

  Model.knex(knexInstance);

  return knexInstance;
};

export default initDB;
