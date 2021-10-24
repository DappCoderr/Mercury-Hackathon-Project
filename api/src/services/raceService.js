import { Races } from "../models/races";
import { Cars } from "../models/cars";

class RaceService {
  listAllRaces = async () => {
    let races = await Races.query();
    return races;
  };

  findOrCreateNewRace = async (car_id_1, car_id_2) => {
    if (car_id_1 && car_id_2) {
      let car_1 = await Cars.query().findOne({ car_nft_id: car_id_1 });
      if (!car_1) {
        throw "Didn't Find Car1";
      } else {
        let car_2 = await Cars.query().findOne({ car_nft_id: car_id_2 });
        if (!car_2) {
          throw "Didn't Find Car2";
        } else {
          const existingRace = await Races.query().findOne({
            car_nft_id_1: car_id_1,
            car_nft_id_2: car_id_2
          });
          if (existingRace) return existingRace;
          const newRace = await Races.query().insertAndFetch({
            user_id_1: car_1.user_id,
            user_id_2: car_2.user_id,
            car_nft_id_1: car_id_1,
            car_nft_id_2: car_id_2,
            request_status: 0
          });
          return newRace;
        }
      }
    }
    throw "No Car Ids Provided";
  };

  updateRaceRequestStatus = async (raceID, status, winner = null) => {
    if (raceID) {
      let race = await Races.query().findById(raceID);
      if (!race) {
        throw "Race Doen't Exist";
      } else {
        let updatedRace = await race.$query().patchAndFetch({
          request_status: status,
          winner
        });
        return updatedRace;
      }
    }
    throw "ReaceId is Empty";
  };
}

export default RaceService;
