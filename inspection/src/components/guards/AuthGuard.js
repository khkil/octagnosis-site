import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { validateTokenRequest, VALIDATE_TOKEN_REQUEST } from '../../modules/auth';
import { getAccessToken } from '../../utils/tokenUtil';

const AuthGuard = ({ children }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isLoggedIn } = useSelector(({ auth, loading }) => ({
    isLoading: loading[VALIDATE_TOKEN_REQUEST],
    isLoggedIn: auth.isLoggedIn
  }))
  useEffect(() => {
    dispatch(validateTokenRequest());
    
  }, [dispatch])

  //if(!isLoggedIn) return <Redirect to="/auth/login"/>;
  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard;