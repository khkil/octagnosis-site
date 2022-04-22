import { LockOpen } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';

const PasswordResetButton = () => {
  return (
    <Button
      color="info"
      startIcon={<LockOpen />}
      variant="contained"
      size="medium"
    >
      <Typography variant="span">비밀번호 초기화</Typography>
    </Button>
  );
};

export default PasswordResetButton;
