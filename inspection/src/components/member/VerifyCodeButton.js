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
      .then(({ success, data }) => {
        if (Boolean(success)) {
          const { name } = data;
          alert(`${name}의 코드 인증에 성공하였습니다.`);
          setVerifiedCode(true);
        }
      })
      .catch(({ response }) => {
        if (response && response.data) {
          alert(response.data.msg);
        } else {
          alert('코드인증에 실패 하였습니다');
        }

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
