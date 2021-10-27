/* @flow */
/* eslint react/jsx-filename-extension: 0 */

import * as React from "react";
import { lazy, Suspense } from "react";

/** Other Utilities */
import { Route, Switch } from "react-router-dom";
import SecuredRoute from "./securedRoute";

/** Other Components */
const HomePage = lazy(() => import("../pages/Home/home"));
const WorkShop = lazy(() => import("../pages/Workshop/workshop"));
const Race = lazy(() => import("../pages/Race/race"));

// const UpcomingFeature = lazy(() => import("../app/views/UpcomingFeature"));
// const Feedback = lazy(() => import("../app/views/Feedback"));
// const UserReviews = lazy(() => import("../app/views/UserReviews/UserReviews"));
// const Billing = lazy(() => import("../app/views/Billing"));
// const Subscriber = lazy(() => import("../app/views/Subscriber"));
const Error404 = lazy(() => import("../Error404"));

const CompRoutes = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <SecuredRoute exact path="/workshop" component={WorkShop} />
        <SecuredRoute exact path="/races" component={Race} />
        <Route component={Error404} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(CompRoutes);
