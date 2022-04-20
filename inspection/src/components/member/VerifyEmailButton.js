import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { sendVerifyEmailApi } from '../../api/authApi';

const VerifyEmailButton = ({ email, hasError, setVerifyEmail }) => {
  const [sentEmail, setSentEmail] = useState(false);
  const [uUid, setUuid] = useState(null);

  const sendVerifyEmail = () => {
    const params = { to: email };
    alert(JSON.stringify(email));
    sendVerifyEmailApi(params)
      .then(({ success }) => {
        if (Boolean(success)) {
          setSentEmail(true);
        }
        alert('메일이 발송 되었습니다');
      })
      .catch(() => {
        alert('2');
      });
    /* if (hasError) {
      alert('error');
      return false;
    }
    setVerifyEmail(true); */
  };

  const verifyEmail = () => {
    alert('인증에 성공하였습니다');
    setVerifyEmail(true);
  };

  return (
    <>
      {!sentEmail ? (
        <Button
          color="primary"
          fullWidth
          variant="contained"
          style={{ height: '56px' }}
          onClick={sendVerifyEmail}
        >
          <Typography variant="subtitle1">인증 메일 발송</Typography>
        </Button>
      ) : (
        <Button
          color="primary"
          fullWidth
          variant="contained"
          style={{ height: '56px' }}
          onClick={verifyEmail}
        >
          <Typography variant="subtitle1">인증 하기</Typography>
        </Button>
      )}
    </>
  );
};

export default VerifyEmailButton;
