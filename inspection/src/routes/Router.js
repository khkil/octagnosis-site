import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { authLayoutRoutes, commonLayoutRoutes } from ".";
import AuthLayout from "../layouts/AuthLayout";
import CommonLayout from "../layouts/CommonLayout";
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from "../modules/auth";

const ProtectedRoute = ({ ...rest }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const protectedPage = Boolean(rest.auth);
  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn
  }));

  useEffect(() => {
    dispatch(validateTokenRequest());

    if(protectedPage && !isLoggedIn){
      alert("로그인이 필요한 페이지 입니다.");
      history.replace("/auth/login")
    }else if(!protectedPage && isLoggedIn){
      history.replace("/")
    }
  }, [isLoggedIn]);
  
  return(
    <Route {...rest}/>
  );
}

const initRoutes = (Layout, routes) => {

  return (
    routes.map((route, index) => { 
      const { component: Component, title, path, auth, children } = route;
      return children ? (
        [route, ...children].map((element, index) => {
          return (
            element.component &&
            <ProtectedRoute
              auth={element.auth}
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
        <ProtectedRoute
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