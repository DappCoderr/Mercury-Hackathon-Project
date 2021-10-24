const env = process.env;
const path = require("path");

console.log("Environments", env);

const config = {
  envMode: env.NODE_ENV,
  port: env.PORT || 3001,
  accessApi: env.FLOW_ACCESS_API_URL,
  databaseUrl: env.DATABASE_URL,
  isHeroku: env.IS_HEROKU
};

export default config;
