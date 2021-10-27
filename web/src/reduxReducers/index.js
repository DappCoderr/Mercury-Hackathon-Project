/* @flow */

import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";
import { packsReducer } from "./packsReducer";
import { workShopReducer } from "./workShopReducer";
import { raceReducer } from "./raceReducer";

const reducers = combineReducers({
  Session: sessionReducer,
  PacksData: packsReducer,
  WorkShop: workShopReducer,
  Races: raceReducer
});

export default reducers;
