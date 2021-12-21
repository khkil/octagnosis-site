import React, { useEffect } from 'react';

const AuthGuard = () => {

  useEffect(() => {
    alert(1);
    console.log("this is auth guard");
  }, [])

  return (
    <>
    </>
  )
}

export default AuthGuard;