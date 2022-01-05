import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../../modules/auth';
import { getAccessToken } from '../../utils/tokenUtil';

const GuestGuard = ({ children }) => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn
  }));

  /* useEffect(() => {
    const accessToken = getAccessToken();
    if(accessToken){
      dispatch(validateTokenRequest())
    }
  }, [dispatch]) */

  if(isLoading) return null;
  if(isLoggedIn && pathname !== "/") return <Redirect to="/"/>;
  return (
    <>
      {children}
    </>
  )
}

export default GuestGuard;