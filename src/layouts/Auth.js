import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { CssBaseline } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../constants";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const Auth = ({ children }) => {
    
  const { accessToken } = localStorage;

  const authReducer = useSelector(state => state.authReducer);
  const { isLoggedIn, data, error } = authReducer;

  const dispatch = useDispatch();
  const history = useHistory();
 
  useEffect(() => {
    if(accessToken){
      dispatch(getAuthInfo());
    }
  }, []);

  if(isLoggedIn && data){
    const { accessToken, member, error } = data;
    if(accessToken){
      localStorage.setItem("accessToken", data.accessToken);
    };
    const { role } = (member ? member : data);
    //const redirectPath = (role === types.ROLE_ADMIN ? "/admin" : "/");
    const redirectPath = (role === types.ROLE_ADMIN ? "/admin" : "/");
    return redirectPath && <Redirect to={redirectPath}/>;
  }else if(error){
    localStorage.removeItem("accessToken");
  }
 
  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </Root>
  );
};

export default Auth;
