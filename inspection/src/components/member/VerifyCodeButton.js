import { Button, Typography } from '@mui/material';
import React from 'react';
import { checkCodeApi } from '../../api/authApi';

const VerifyCodeButton = ({ code, setVerifiedCode }) => {
  const checkCode = () => {
    if (!code) {
      alert('단체코드를 입력해주세요');
      return false;
    }
    checkCodeApi(code)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('유효한 코드 입니다.');
          setVerifiedCode(true);
        }
      })
      .catch(() => {
        alert('유효하지 않은 코드 입니다.');
        setVerifiedCode(false);
      });
  };
  return (
    <Button
      color="info"
      fullWidth
      variant="contained"
      style={{ height: '56px' }}
      onClick={checkCode}
    >
      <Typography variant="subtitle1">코드인증</Typography>
    </Button>
  );
};

export default VerifyCodeButton;
