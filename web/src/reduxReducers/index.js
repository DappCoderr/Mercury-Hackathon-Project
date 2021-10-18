/* @flow */

import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import { publicDataReducer } from "./publicData";

const reducers = combineReducers({
  Session: sessionReducer,
  PublicData: publicDataReducer
});

export default reducers;
