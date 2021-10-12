/* @flow */
/* eslint react/jsx-filename-extension: 0 */

import * as React from "react";
import { useSelector } from "react-redux";

/** Other Components */
import { Route, Redirect } from "react-router-dom";

/** Flow */
import * as fcl from "@onflow/fcl";

const SecuredRoute = ({ component: Component, ...rest }) => {
  const { title } = rest;

  let authenticated = true;
  const currentUser = useSelector(state => state.Session).user;

  if (title !== undefined && title !== null) {
    document.title = "Mercury Hackathon -" + title;
  } else {
    document.title = "Mercury Hackathon";
  }

  if (!currentUser) {
    authenticated = false;
  }

  console.log("Authenticated", authenticated);

  const authenticateUserBeforeNavigation = async () => {
    try {
      await fcl.logIn();
    } catch (e) {
      console.error("coulnt authenticate");
    }
  };

  if (authenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    // fcl.logIn();
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        )}
      />
    );
  }
};

export default React.memo(SecuredRoute);
