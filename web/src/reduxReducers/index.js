/* @flow */

import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";

const reducers = combineReducers({
  Session: sessionReducer,
});

export default reducers;
