import express from "express";
import { body } from "express-validator";

function initPacksRouter(packsService) {
  const router = express.Router();

  router.get("/packs", async (req, res) => {
    const transaction = await packsService.listAllPacks();
    return res.status(200).json(transaction);
  });

  return router;
}

export default initPacksRouter;
