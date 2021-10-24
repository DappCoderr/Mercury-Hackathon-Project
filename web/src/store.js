/*  @flow */

import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { loadState, saveState } from "./utils/StateLoader";
import loggerMiddleware from "./utils/logger";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import rootReducer from "./reduxReducers";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// State saved in local storage
const persistedState = loadState();

// middlewares - (don't remove thunk)
const middleware = [loggerMiddleware, thunk, routerMiddleware(history)];

// enhancers
const enhancers = [];

// __REDUX_DEVTOOLS_EXTENSION__ - for Redux State Debugging in browser ( Don't Change It)
if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composedEnhancers
);

store.subscribe(
  throttle(() => {
    console.log("STATE_LENGTH", store.getState());
    // save state in local storage
    saveState({
      Session: store.getState().Session
      // Query: store.getState().Query
    });
  }, 1000)
);

export default store;
