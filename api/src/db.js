import { knex } from "knex";
const path = require("path");

const { Model } = require("objection");
import config from "./config";

const initDB = () => {
  const knexInstance = knex({
    client: "postgresql",
    connection: {
      connectionString: config.databaseUrl,
      sslmode: config.envMode === "production" ? "require" : "disable"
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
