import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authLayoutRoutes, commonLayoutRoutes } from ".";
import CommonLayout from "../components/layouts/CommonLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import Guard from "../components/guards";

const initRoutes = (Layout, routes) => {

  return (
    routes.map((route, index) => { 
      const { component: Component, title, path, auth, children } = route;
      return children ? (
        [route, ...children].map((element, index) => {
          return (
            element.component &&
            <Route
              auth={element.auth}
              key={index}
              path={element.path}
              exact
              render={(props) => (
                <>
                  <Guard auth={element.auth}>
                    <Layout title={element.title}>
                      <element.component {...props} />
                    </Layout> 
                  </Guard>
                </>
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
            <>
              <Guard auth={auth}>
                <Layout title={title}>
                  <Component {...props} />
                </Layout> 
              </Guard>
            </>
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
      {initRoutes(AuthLayout, authLayoutRoutes)}
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