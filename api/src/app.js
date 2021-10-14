import "express-async-errors";

import path from "path";
import config from "./config";
import express from "express";

import cors from "cors";

import { json, urlencoded } from "body-parser";

import initUsersRouter from "./routes/users";

const V1 = "/v1/";

const initApp = usersService => {
  const app = express();

  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(V1, initUsersRouter(usersService));
  //   app.use(V1, initKibblesRouter(kibblesService));
  //   app.use(V1, initKittyItemsRouter(kittyItemsService));
  //   app.use(V1, initStorefrontRouter(storefrontService));

  const serveReactApp = () => {
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
