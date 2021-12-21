import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authLayoutRoutes, commonLayoutRoutes } from ".";
import AuthGuard from "../components/guards/AuthGuard";
import AuthLayout from "../layouts/AuthLayout";
import CommonLayout from "../layouts/CommonLayout";

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
                  {element.auth && <AuthGuard/>}
                  <Layout title={element.title}>
                    <element.component {...props} />
                  </Layout> 
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
              {auth && <AuthGuard/>}
              <Layout title={title}>
                <Component {...props} />
              </Layout> 
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