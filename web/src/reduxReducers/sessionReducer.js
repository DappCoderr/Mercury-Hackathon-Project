/* @flow */
import { GET_FUSD_BALANCE } from "../flow/get-fusd-balance.script";
import { CHECK_COLLECTION } from "../flow/check-collection.script";
import { CREATE_COLLECTION } from "../flow/create-collection.tx";

import { query, mutate } from "@onflow/fcl";

import { addTransaction } from "./transactionReducer";

const SESSION = Object.freeze({
  CREATE_SESSION: "CREATE_SESSION",
  EXPIRE_SESSION: "EXPIRE_SESSION"
});

const INITIAL_STATE = {
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

const getUserCollection = (userID, userAddr) => {
  return async dispatch => {
    try {
      let collection = await query({
        cadence: CHECK_COLLECTION,
        args: (arg, t) => [arg(userAddr, t.Address)]
      });
      if (!collection) {
        collection = await dispatch(createUserCollection(userID, userAddr));
      }
      return collection;
    } catch (err) {
      throw err;
    }
  };
};

const createUserCollection = (userID, userAddr) => {
  return async dispatch => {
    try {
      let collectionTransactionID = await mutate({
        cadence: CREATE_COLLECTION,
        limit: 55
      });
      await dispatch(addTransaction(userID, collectionTransactionID));
      if (collectionTransactionID) return true;
    } catch (err) {
      throw err;
    }
  };
};

export const checkUserStatus = user => {
  return async (dispatch, getState) => {
    const stateUserId = getState()?.Session?.user?.id ?? null;
    try {
      if (!stateUserId) {
        // if (true) {
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
          const collectionStatus = await dispatch(
            getUserCollection(userInDB.id, userInDB.address)
          );
          return dispatch({
            type: SESSION.CREATE_SESSION,
            user: {
              ...user,
              id: userInDB.id,
              fusdBal: fusdbal,
              collectionStatus
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
