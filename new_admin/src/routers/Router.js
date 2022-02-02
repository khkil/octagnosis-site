import React, { useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { authLayoutRoutes, commonLayoutRoutes } from '.';
import CommonLayout from '../components/layouts/CommonLayout';
import AuthLayout from '../components/layouts/AuthLayout';
import Guard from '../components/guards';
import { useDispatch, useSelector } from 'react-redux';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../modules/auth';

const PrivateRoute = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn,
  }));

  const loadingCompleted = useMemo(
    () => isLoading != null && !Boolean(isLoading),
    [isLoading],
  );

  useEffect(() => {
    dispatch(validateTokenRequest());
  }, []);

  if (loadingCompleted && !isLoggedIn && pathname !== '/auth/login')
    return <Redirect to="/auth/login" />;
  return <Route {...rest} />;
};

const initRoutes = (Layout, routes) => {
  return routes.map((route, index) => {
    const { component: Component, title, path, auth, children } = route;
    return children ? (
      [route, ...children].map((element, index) => {
        return (
          element.component && (
            <PrivateRoute
              auth={element.auth}
              key={index}
              path={path + element.path}
              exact
              render={props => (
                <Layout title={element.title}>
                  <element.component {...props} />
                </Layout>
              )}
            />
          )
        );
      })
    ) : Component ? (
      <PrivateRoute
        key={index}
        path={path}
        auth={auth}
        exact
        render={props => (
          <Layout title={title}>
            <Component {...props} />
          </Layout>
        )}
      />
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
