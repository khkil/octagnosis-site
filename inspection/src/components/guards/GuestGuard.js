import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../../modules/auth';

const GuestGuard = ({ children }) => {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn
  }));

  useEffect(() => {
    dispatch(validateTokenRequest());
  }, [dispatch])

  if(isLoggedIn && pathname !== "/") return <Redirect to="/"/>
  return (
    <>
      {children}
    </>
  )
}

export default GuestGuard;