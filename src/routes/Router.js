import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { authLayoutRoutes, commonLayoutRoutes } from '.';
import AuthLayout from '../layouts/AuthLayout';
import CommonLayout from '../layouts/CommonLayout';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../modules/auth';

const PrivateRoute = ({ ...rest }) => {
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading:
      loading[VALIDATE_TOKEN_REQUEST] === undefined ||
      loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn,
  }));

  const loadingCompleted = useMemo(
    () => isLoading != null && !Boolean(isLoading),
    [isLoading],
  );

  useEffect(() => {
    dispatch(validateTokenRequest());
  }, []);

  if (!isLoggedIn) return <Redirect to="/auth/login" />;
  return <Route {...rest} />;
};

const PublicRoute = ({ ...rest }) => {
  const { isLoggedIn } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));

  if (isLoggedIn && location.pathname !== '/') return <Redirect to="/" />;
  return <Route {...rest} />;
};

const initRoutes = (Layout, routes) => {
  return routes.map((route, index) => {
    const { component: Component, title, path, auth, children } = route;
    return children ? (
      [route, ...children].map((element, index) => {
        return element.component && element.auth ? (
          <PrivateRoute
            key={index}
            path={element.path}
            exact
            render={props => (
              <Layout title={element.title}>
                <element.component {...props} />
              </Layout>
            )}
          />
        ) : (
          <PublicRoute
            key={index}
            path={element.path}
            exact
            render={props => (
              <Layout title={element.title}>
                <element.component {...props} />
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      auth ? (
        <PrivateRoute
          key={index}
          path={path}
          exact
          render={props => (
            <Layout title={title}>
              <Component {...props} />
            </Layout>
          )}
        />
      ) : (
        <PublicRoute
          key={index}
          path={path}
          exact
          render={props => (
            <Layout title={title}>
              <Component {...props} />
            </Layout>
          )}
        />
      )
    ) : null;
  });
};

const Routes = () => (
  <Router>
    <Switch>
      {initRoutes(CommonLayout, commonLayoutRoutes)}
      {initRoutes(AuthLayout, authLayoutRoutes)}
      <Route render={() => <div>404</div>} />
    </Switch>
  </Router>
);

export default Routes;
