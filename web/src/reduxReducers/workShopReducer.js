/* @flow */

export const WORKSHOP = Object.freeze({
  SELECT_PART: "SELECT_PART",
  UNSELECT_PART: "UNSELECT_PART"
});

export const INITIAL_STATE = {
  carPartsUsed: []
};

export const saveNewCar = (carID, configVal) => {
  return async (dispatch, getState) => {
    const userID = getState()?.Session?.user?.id ?? null;
    try {
      if (userID) {
        const newCarRes = await fetch(`/v1/cars`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userID,
            carID,
            configVal
          })
        });
        const newCar = await newCarRes.json();
        console.log("Car In DB", newCar);
        return newCar;
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
};

export const selectWSCarPart = partId => ({
  type: WORKSHOP.SELECT_PART,
  partId
});

export const unSelectWSCarPart = partId => ({
  type: WORKSHOP.UNSELECT_PART,
  partId
});

export const workShopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WORKSHOP.SELECT_PART: {
      if (state.carPartsUsed.includes(action.partId)) {
        return state;
      } else {
        return {
          ...state,
          ...{ carPartsUsed: [...state.carPartsUsed, action.partId] }
        };
      }
    }
    case WORKSHOP.UNSELECT_PART: {
      return {
        ...state,
        ...{
          carPartsUsed: [
            ...state.carPartsUsed.filter(partId => partId !== action.partId)
          ]
        }
      };
    }

    default:
      return state;
  }
};
