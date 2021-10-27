import express from "express";
import { body } from "express-validator";
import ConnectionService from "../services/socketConnectionService";

function initPacksRouter(packsService, usersService) {
  const router = express.Router();

  router.get("/packs", async (req, res) => {
    try {
      const transaction = await packsService.listAllPacks();
      return res.status(200).json(transaction);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

  router.patch("/packs-buy", async (req, res) => {
    try {
      const addr = req.headers.addr;
      const packId = req.body.packId;
      if (addr && packId) {
        const userTransaction = await usersService.findUserByAddr(addr);
        if (userTransaction.id) {
          const transaction = await packsService.updateASoldStatusOfPack(
            packId,
            userTransaction.id
          );
          return res.status(200).json(transaction);
        }
      }
      return res.status(400).json({
        error: "Missing Parameters !!"
      });
    } catch (e) {
      return res.status(400).json({
        error: e
      });
    }
  });

  return router;
}

export default initPacksRouter;
