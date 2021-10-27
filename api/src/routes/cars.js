import express from "express";

function initCarsRouter(carsService) {
  const router = express.Router();

  router.get("/cars", async (req, res) => {
    try {
      const transaction = await carsService.listAllCars();
      return res.status(200).json(transaction);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

  router.post("/cars", async (req, res) => {
    const { userID, carID, configVal } = req.body;
    try {
      const transaction = await carsService.findOrCreateNewCar(
        userID,
        carID,
        configVal
      );
      return res.status(200).json(transaction);
    } catch (e) {
      console.log("Error Car", e);
      return res.status(400).json({
        error: e
      });
    }
  });

  router.patch("/cars/owner", async (req, res) => {
    try {
      const { carID, userID } = req.body;
      if (carID && userID) {
        const transaction = await carsService.updateCarOwner(userID, carID);
        return res.status(200).json(transaction);
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

export default initCarsRouter;
