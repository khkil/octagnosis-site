import { Button } from '@mui/material';
import React from 'react';

const MemberIdVerificationButton = ({ idVerificated, setIdVerificated }) => {

  return (
    <Button 
      fullWidth
      variant="contained"
      style={{height: "56px"}}
      onClick={() => {
        setIdVerificated(true)
      }}
    >중복확인
    {Boolean(idVerificated).toString()}
    </Button>
  )
}

export default MemberIdVerificationButton;