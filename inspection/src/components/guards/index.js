import React from 'react';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';

const Guard = ({ auth, children }) => {

  return (
    auth ? 
    <AuthGuard>
      {children}
    </AuthGuard> :
    <GuestGuard>
      {children}
    </GuestGuard>
  )
}

export default Guard;