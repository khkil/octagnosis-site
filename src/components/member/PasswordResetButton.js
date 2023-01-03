import { LockOpen } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import PasswordResetPopup from '../auth/PasswordResetPopup';

const PasswordResetButton = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };
  return (
    <>
      <PasswordResetPopup open={openPopup} setOpen={setOpenPopup} />
      <Button
        color="info"
        startIcon={<LockOpen />}
        variant="contained"
        size="medium"
        onClick={togglePopup}
      >
        <Typography variant="span">비밀번호 초기화</Typography>
      </Button>
    </>
  );
};

export default PasswordResetButton;
