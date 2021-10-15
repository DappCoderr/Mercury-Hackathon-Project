import express from "express";
import { body } from "express-validator";

function initUsersRouter(usersService) {
  const router = express.Router();

  router.post("/users", async (req, res) => {
    console.log("Request Body", req.body);
    const { address } = req.body;

    const transaction = await usersService.findOrCreateNewUser(address);
    return res.status(200).json(transaction);
  });

  return router;
}

export default initUsersRouter;
