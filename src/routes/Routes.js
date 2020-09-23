import React from "react";
import history from "../history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import DefaultLayout from "../layout/DefaultLayout";
import ElasticBrowser from "./../pages/elasticBrowser/ElasticBrowser";
import "../custom_styles/Form.scss";

function Routes() {
  return (
    <Router history={history} basename={"/elastic-ui"}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/elastic-browser" />
        </Route>
     
        <DefaultLayout
          exact
          path="/elastic-browser"
          component={ElasticBrowser}
        />

        <Route exact path="/404" component={PageNotFound} />
        <Route exact path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
