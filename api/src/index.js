import config from "./config";
import initApp from "./app";
import initDB from "./db";

import UsersService from "./services/usersService";
import PacksService from "./services/packsService";
import ConnectionService from "./services/socketConnectionService";
import TransactionsService from "./services/transactionsService";
import RaceService from "./services/raceService";
import CarService from "./services/carsService";

const socket = require("socket.io");

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
    const transactionsService = new TransactionsService();
    const raceService = new RaceService();
    const carsService = new CarService();

    const app = initApp(
      usersService,
      packsService,
      transactionsService,
      carsService,
      raceService
    );

    const server = app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}!`);
    });

    // Socket setup
    const io = socket(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"]
      }
    });

    io.on("connection", function (socket) {
      console.log("Connection Extablished");
      new ConnectionService(io, socket);
    });
  };

  startAPIServer();
}

const redOutput = "\x1b[31m%s\x1b[0m";

run().catch(e => {
  console.error(redOutput, e);
  process.exit(1);
});
