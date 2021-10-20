/* @flow */
import { GET_FUSD_BALANCE } from "../flow/get-fusd-balance.script";
import { CHECK_COLLECTION } from "../flow/check-collection.script";

import { query } from "@onflow/fcl";

export const SESSION = Object.freeze({
  CREATE_SESSION: "CREATE_SESSION",
  EXPIRE_SESSION: "EXPIRE_SESSION"
});

export const INITIAL_STATE = {
  user: null
};

const getFUSDBalance = userAddr => {
  return async () => {
    try {
      let fusdBal = await query({
        cadence: GET_FUSD_BALANCE,
        args: (arg, t) => [arg(userAddr, t.Address)]
      });
      return fusdBal;
    } catch (err) {
      throw err;
    }
  };
};

const getUserCollection = userAddr => {
  return async () => {
    try {
      let collection = await query({
        cadence: CHECK_COLLECTION,
        args: (arg, t) => [arg(userAddr, t.Address)]
      });
      console.log("Collection Here", collection);
      return collection;
    } catch (err) {
      console.error("Error collect", err);
      // throw err;
    }
  };
};

const createUserCollection = userAddr => {
  return async () => {
    try {
      let collection = await query({
        cadence: CHECK_COLLECTION,
        args: (arg, t) => [arg(userAddr, t.Address)]
      });
      console.log("Collection Here", collection);
      return collection;
    } catch (err) {
      console.error("Error collect", err);
      // throw err;
    }
  };
};

export const checkUserStatus = user => {
  return async (dispatch, getState) => {
    const stateUserId = getState()?.Session?.user?.id ?? null;
    console.log("UserInState", stateUserId);
    try {
      if (!stateUserId) {
        const userInDBRes = await fetch(`/v1/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ address: user.addr })
        });
        const userInDB = await userInDBRes.json();
        console.log("UserInDB", userInDB);
        if (userInDB.id && userInDB.address) {
          const fusdbal = await dispatch(getFUSDBalance(userInDB.address));
          await dispatch(getUserCollection(userInDB.address));
          return dispatch({
            type: SESSION.CREATE_SESSION,
            user: {
              ...user,
              id: userInDB.id,
              fusdBal: fusdbal
            }
          });
        }
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
};

export const createSession = user => {
  return dispatch => {
    dispatch({
      type: SESSION.CREATE_SESSION,
      user
    });
  };
};

export const expireSession = () => ({
  type: SESSION.EXPIRE_SESSION
});

export const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION.CREATE_SESSION: {
      console.log("Dispatch", action);
      return { ...state, ...{ user: action.user } };
    }

    case SESSION.EXPIRE_SESSION: {
      return { ...state, ...INITIAL_STATE };
    }

    default:
      return state;
  }
};
