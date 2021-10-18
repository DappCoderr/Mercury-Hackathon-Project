import config from "./config";
import initApp from "./app";
import initDB from "./db";

import UsersService from "./services/usersService";
import PacksService from "./services/packsService";

async function run() {
  // const config = getConfig(envVars);
  const db = initDB();

  // Make sure to disconnect from DB when exiting the process
  process.on("SIGTERM", () => {
    db.destroy().then(() => {
      process.exit(0);
    });
  });

  // Run all database migrations
  await db.migrate.latest();
  await db.seed.run();

  const startAPIServer = () => {
    console.log("Starting API server ....");

    const usersService = new UsersService();
    const packsService = new PacksService();

    const app = initApp(usersService, packsService);

    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}!`);
    });
  };

  startAPIServer();
}

const redOutput = "\x1b[31m%s\x1b[0m";

run().catch(e => {
  console.error(redOutput, e);
  process.exit(1);
});
