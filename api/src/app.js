import "express-async-errors";

import path from "path";
import config from "./config";
import express from "express";

import cors from "cors";

import { json, urlencoded } from "body-parser";

import initUsersRouter from "./routes/users";
import initPacksRouter from "./routes/packs";
import initTransactionsRouter from "./routes/transactions";
import initCarsRouter from "./routes/cars";
import initRacesRouter from "./routes/races";

const V1 = "/v1/";

const initApp = (
  usersService,
  packsService,
  transactionsService,
  carsService,
  raceService
) => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(V1, initUsersRouter(usersService));
  app.use(V1, initPacksRouter(packsService, usersService));
  app.use(V1, initTransactionsRouter(transactionsService));
  app.use(V1, initCarsRouter(carsService));
  app.use(V1, initRacesRouter(raceService));

  const serveReactApp = () => {
    console.log("Serve React App");
    app.use(express.static(path.resolve(__dirname, "../../web/build")));
    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../../web/build/index.html"));
    });
  };

  if (config.isHeroku === "true") {
    // Serve React static site using Express when deployed to Heroku.
    serveReactApp();
  }

  app.all("*", async (req, res) => {
    return res.sendStatus(404);
  });

  return app;
};

export default initApp;
