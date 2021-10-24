const RACE = {
  SET_CAR_1: "SET_CAR_1",
  SET_CAR_2: "SET_CAR_2"
};

const INITIAL_STATE = {
  car1: null,
  car2: null
};

export const requestForRacing = (car_id_1, car_id_2) => {
  return async () => {
    try {
      const newRaceRes = await fetch(`/v1/races`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ car_id_1, car_id_2 })
      });
      console.log("New newRaceRes", newRaceRes);
      return await newRaceRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const acceptRaceRequest = raceID => {
  return async (dispatch, getState) => {
    try {
      const acceptedRaceRes = await fetch(`/v1/races/request-accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ raceID })
      });
      console.log("accepted newRaceRes", acceptedRaceRes);
      return await acceptedRaceRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const rejectRaceRequest = raceID => {
  return async () => {
    try {
      const rejectedRaceRes = await fetch(`/v1/races/request-reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ raceID })
      });
      console.log("accepted newRaceRes", rejectedRaceRes);
      return await rejectedRaceRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const getAllCars = () => {
  return async () => {
    try {
      const carsRes = await fetch(`/v1/cars`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await carsRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const getAllRaces = () => {
  return async () => {
    try {
      const carsRes = await fetch(`/v1/races`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return await carsRes.json();
    } catch (e) {
      throw e;
    }
  };
};

export const selectCar1 = carId => ({
  type: RACE.SET_CAR_1,
  carId
});

export const raceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RACE.SET_CAR_1:
      return {
        ...state,
        car1: action.carId
      };
    case RACE.SET_CAR_2:
      return {
        ...state,
        car2: action.carId
      };

    default:
      return state;
  }
};
