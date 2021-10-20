import express from "express";
import { body } from "express-validator";

function initTransactionsRouter(transactionsService) {
  const router = express.Router();

  router.post("/transactions", async (req, res) => {
    try {
      const userID = req.body.userID;
      const transactionID = req.body.transactionID;
      const transaction = await transactionsService.findOrCreateNewTransaction(
        userID,
        transactionID
      );
      return res.status(200).json(transaction);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

  router.patch("/transactions", async (req, res) => {
    try {
      const userID = req.body.userID;
      const transactionID = req.body.transactionID;
      const transactionStatus = req.body.transactionStatus;
      const updatedTransaction =
        await transactionsService.updateTransactionStatus(
          userID,
          transactionID,
          transactionStatus
        );
      return res.status(200).json(updatedTransaction);
    } catch (e) {
      return res.status(400).json({
        error: e
      });
    }
  });

  router.delete("/transactions", async (req, res) => {
    try {
      const transactionID = req.body.transactionID;
      const deletedTransaction = await transactionsService.deleteTheTransaction(
        transactionID
      );
      return res.status(200).json(deletedTransaction);
    } catch (e) {
      return res.status(400).json({
        error: e
      });
    }
  });

  return router;
}

export default initTransactionsRouter;
