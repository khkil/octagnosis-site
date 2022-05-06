import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { sendVerifyEmailApi, checkEmailApi } from '../../api/authApi';
import { emailRegExp } from '../../utils/common';
import { LoadingButton } from '@mui/lab';

const VerifyEmailButton = ({ email, verifiedEmail, setVerifiedEmail }) => {
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const sendVerifyEmail = () => {
    if (!emailRegExp.test(email)) {
      alert('이메일 형식에 맞게 입력해주세요.');
      return false;
    }
    setLoading(true);
    const params = { toEmail: email };
    sendVerifyEmailApi(params)
      .then(({ success, data }) => {
        if (Boolean(success)) {
          alert(
            '인증메일이 발송 되었습니다. 메일함으로가 인증을 완료 해주세요.',
          );
          setSentEmail(true);
          setLoading(false);
        }
      })
      .catch(() => {
        alert('메일발송에 실패 하였습니다. 관리자에게 문의해주세요.');
      });
  };

  const verifyEmail = () => {
    const params = {
      toEmail: email,
    };
    checkEmailApi(params)
      .then(({ success }) => {
        if (Boolean(success)) {
          alert('인증에 성공 하였습니다');
          setVerifiedEmail(true);
        }
      })
      .catch(() => {
        alert('인증에 실패 하였습니다.');
      });
  };

  return (
    <>
      {!sentEmail ? (
        <LoadingButton
          color="info"
          fullWidth
          loading={loading}
          variant="contained"
          style={{ height: '56px' }}
          onClick={sendVerifyEmail}
        >
          <Typography variant="subtitle1">인증 메일 발송</Typography>
        </LoadingButton>
      ) : (
        <Button
          color="info"
          fullWidth
          variant="contained"
          style={{ height: '56px' }}
          onClick={verifyEmail}
          disabled={verifiedEmail}
        >
          <Typography variant="subtitle1">
            {verifiedEmail ? '인증완료' : '인증하기'}
          </Typography>
        </Button>
      )}
    </>
  );
};

export default VerifyEmailButton;
