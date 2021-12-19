import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { commonLayoutRoutes } from ".";
import CommonLayout from "../layouts/CommonLayout";

const initRoutes = (Layout, routes) => {

  console.log(routes);
  return (
    routes.map((route, index) => { 
      const { component: Component, title, path, auth, children } = route;
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
                <Layout title={element.title}>
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
            <Layout title={title}>
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