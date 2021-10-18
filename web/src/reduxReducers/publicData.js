/* @flow */
export const PUBLIC_DATA = Object.freeze({
  SET_PACKS_LIST: "SET_PACKS_LIST"
});

export const INITIAL_STATE = {
  pack_list: []
};

export const getPackList = () => {
  return async dispatch => {
    try {
      const packsRes = await fetch(`/v1/packs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const packs = await packsRes.json();
      console.log("Packs In DB", packs);
      if (packs) {
        return dispatch({
          type: PUBLIC_DATA.SET_PACKS_LIST,
          packs
        });
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
};

export const publicDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUBLIC_DATA.SET_PACKS_LIST: {
      return { ...state, ...{ pack_list: action.packs } };
    }

    default:
      return state;
  }
};
