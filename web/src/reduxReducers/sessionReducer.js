/* @flow */

export const SESSION = Object.freeze({
  CREATE_SESSION: "CREATE_SESSION",
  EXPIRE_SESSION: "EXPIRE_SESSION"
});

export const INITIAL_STATE = {
  user: null
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
