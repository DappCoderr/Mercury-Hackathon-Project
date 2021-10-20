/* @flow */

export const PACKS_DATA = Object.freeze({
  SET_PACKS_LIST: "SET_PACKS_LIST",
  UPDATE_PACK: "UPDATE_PACK"
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
          type: PACKS_DATA.SET_PACKS_LIST,
          packs
        });
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
};

export const buyPack = packId => {
  return async (dispatch, getState) => {
    const stateUserAddr = getState()?.Session?.user?.addr ?? null;
    try {
      if (stateUserAddr) {
        const updatedPackRes = await fetch(`/v1/packs-buy`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            addr: stateUserAddr
          },
          body: JSON.stringify({
            packId
          })
        });
        const updatedPack = await updatedPackRes.json();
        if (updatedPack && updatedPack.id) {
          return dispatch({
            type: PACKS_DATA.UPDATE_PACK,
            updatedPack
          });
        }
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
};

export const onPacksSoldUpdateList = updatedPack => ({
  type: PACKS_DATA.UPDATE_PACK,
  updatedPack
});

const updatePack = (updatedPack, state) => {
  console.log("Updating Pack");
  const state_pack_list = state?.pack_list;
  const state_pack_index = state_pack_list.findIndex(
    p => p.id === updatedPack.id
  );
  if (state_pack_index !== -1) {
    const new_pack_list = [
      ...state_pack_list.slice(0, state_pack_index),
      updatedPack,
      ...state_pack_list.slice(state_pack_index + 1)
    ];
    return new_pack_list;
  }
  return state_pack_list;
};

export const packsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PACKS_DATA.SET_PACKS_LIST: {
      return { ...state, ...{ pack_list: action.packs } };
    }
    case PACKS_DATA.UPDATE_PACK: {
      return {
        ...state,
        ...{
          pack_list: [...updatePack(action.updatedPack, state)]
        }
      };
    }

    default:
      return state;
  }
};
