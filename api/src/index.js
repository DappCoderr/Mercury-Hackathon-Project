import initApp from "./app";
import initDB from "./db";
import { Users } from "./models/users";

import UsersService from "./services/usersService";

async function run() {
  // const config = getConfig(envVars);
  const db = initDB({});

  // Make sure to disconnect from DB when exiting the process
  process.on("SIGTERM", () => {
    db.destroy().then(() => {
      process.exit(0);
    });
  });

  // Run all database migrations
  await db.migrate.latest();

  const startAPIServer = () => {
    console.log("Starting API server ....");

    const usersService = new UsersService();

    const app = initApp(usersService);

    app.listen(3001, () => {
      console.log(`Listening on port 3001!`);
    });
  };

  startAPIServer();
}

const redOutput = "\x1b[31m%s\x1b[0m";

run().catch(e => {
  console.error(redOutput, e);
  process.exit(1);
});
