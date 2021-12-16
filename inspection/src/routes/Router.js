import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { commonLayoutRoutes } from ".";
import CommonLayout from "../layouts/CommonLayout";

const initRoutes = (Layout, routes) => {

  return (
    routes.map((route, index) => { 
      const { component: Component, children, path, auth } = route;
      return children ? (
        [route, ...children].map((element, index) => {
          return (
            element.component &&
            <Route
              auth={auth}
              key={index}
              path={element.path}
              exact
              render={(props) => (
                <Layout>
                  <element.component {...props} />
                </Layout> 
              )}
            />
          );
        })
      ) : Component ? (
        <Route
          key={index}
          path={path}
          auth={auth}
          exact
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout> 
          )}
        />
      ) : null;
    })
  )
}


const Routes = () => (
  <Router>
    <Switch>
    {initRoutes(CommonLayout, commonLayoutRoutes)}
      <Route
        render={() => (
          <div>
            404
          </div>
        )}
      />
    </Switch>
  </Router>
);

export default Routes;