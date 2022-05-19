import { Button, Typography } from '@mui/material';
import React from 'react';
import { checkIdApi } from '../../api/authApi';

const VerifyIdButton = ({ value, verifiedId, setVerifiedId }) => {
  const checkId = () => {
    if (!value) {
      alert('아이디를 입력해주세요');
      return false;
    }
    checkIdApi(value)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('사용가능한 아이디 입니다');
          setVerifiedId(true);
        }
      })
      .catch(() => {
        alert('사용중인 아이디 입니다');
        setVerifiedId(false);
      });
  };
  return (
    <Button
      color="info"
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
