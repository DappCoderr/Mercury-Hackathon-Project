/* @flow */

import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import { packsReducer } from "./packsReducer";

const reducers = combineReducers({
  Session: sessionReducer,
  PacksData: packsReducer
});

export default reducers;
