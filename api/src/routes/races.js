import express from "express";

function initRacesRouter(raceService) {
  const router = express.Router();

  router.get("/races", async (req, res) => {
    try {
      const transaction = await raceService.listAllRaces();
      return res.status(200).json(transaction);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

  router.post("/races", async (req, res) => {
    const { car_id_1, car_id_2 } = req.body;
    try {
      const transaction = await raceService.findOrCreateNewRace(
        car_id_1,
        car_id_2
      );
      return res.status(200).json(transaction);
    } catch (e) {
      return res.status(400).json({
        error: e
      });
    }
  });

  router.patch("/races/request-accept", async (req, res) => {
    try {
      const { raceID } = req.body;
      if (raceID) {
        const transaction = await raceService.updateRaceRequestStatus(
          raceID,
          1
        );
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

  router.patch("/races/request-reject", async (req, res) => {
    try {
      const { raceID } = req.body;
      if (raceID) {
        const transaction = await raceService.updateRaceRequestStatus(
          raceID,
          3
        );
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

  router.patch("/races/race-completed", async (req, res) => {
    try {
      const { raceID, userID } = req.body;
      if (raceID && userID) {
        const transaction = await raceService.updateRaceRequestStatus(
          raceID,
          1,
          userID
        );
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

export default initRacesRouter;
