import { Cars } from "../models/cars";
import { Users } from "../models/users";

class CarService {
  listAllCars = async () => {
    let cars = await Cars.query();
    return cars;
  };

  findOrCreateNewCar = async (userID, carID, configVal) => {
    if (userID && carID && configVal) {
      let user = await Users.query().findById(userID);
      if (!user) {
        throw "User Doen't Exist";
      } else {
        let existingCar = await Cars.query().findOne({
          car_nft_id: carID
        });
        if (existingCar) return existingCar;
        const newCar = await Cars.query().insertAndFetch({
          user_id: userID,
          car_nft_id: carID,
          car_config_value: configVal
        });
        return newCar;
      }
    }
    throw "Can't create User Entry without userID,carID, configVal ";
  };

  updateCarOwner = async (userID, carID) => {
    if (userID && carID) {
      let user = await Users.query().findById(userID);
      if (!user) {
        throw "User Doen't Exist";
      } else {
        let car = await Cars.query().findOne({
          car_nft_id: carID
        });
        if (!car) {
          throw "Car Doen't Exist";
        }
        updatedCar = await car.$query().patchAndFetch({
          user_id: userID
        });
        return car;
      }
    }
    throw "Can't create User Entry without Address";
  };
}

export default CarService;
