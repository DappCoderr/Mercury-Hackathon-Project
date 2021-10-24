const INITIAL_STATE = {};

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem("state");
    console.log("load state is", JSON.stringify(serializedState));
    if (serializedState === null) {
      return INITIAL_STATE;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return INITIAL_STATE;
  }
};

export const saveState = (state) => {
  try {
    console.log(`save state is ${JSON.stringify(state)}`);
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem("state", serializedState);
    console.log(`save state is 13233 ${window.localStorage.getItem("state")}`);
  } catch (err) {}
};
