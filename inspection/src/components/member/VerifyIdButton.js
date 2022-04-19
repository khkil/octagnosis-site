import { Button, Typography } from '@mui/material';
import React from 'react';
import { checkIdApi } from '../../api/authApi';

const VerifyIdButton = ({ value, setVerifyId }) => {
  const checkId = () => {
    if (!value) return false;
    checkIdApi(value)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('사용가능한 아이디 입니다');
          setVerifyId(true);
        }
      })
      .catch(() => {
        alert('사용중인 아이디 입니다');
        setVerifyId(false);
      });
  };
  return (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      style={{ height: '56px' }}
      onClick={checkId}
    >
      <Typography variant="subtitle1">중복확인</Typography>
    </Button>
  );
};

export default VerifyIdButton;
