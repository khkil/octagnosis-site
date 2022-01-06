import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../../modules/auth';

const AuthGuard = ({ children }) => {

  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn
  }))
  useEffect(() => {
    dispatch(validateTokenRequest());
    
  }, [dispatch])

  if(!isLoggedIn) return null;
  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard;