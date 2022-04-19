import { Button, Typography } from '@mui/material';
import React from 'react';
import { checkIdApi } from '../../api/authApi';

const VerifyEmailButton = ({ value, setVerifyEmail }) => {
  const checkId = () => {
    setVerifyEmail(true);
  };
  return (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      style={{ height: '56px' }}
      onClick={checkId}
    >
      <Typography variant="subtitle1">인증 메일 발송</Typography>
    </Button>
  );
};

export default VerifyEmailButton;
