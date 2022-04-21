import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import { sendVerifyEmailApi, verifyEmailApi } from '../../api/authApi';

const EmailVerifyPage = () => {
  const [timer, setTimer] = useState(2000);
  const [success, setSuccess] = useState(false);
  const timerRef = useRef(2000);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((timerRef.current -= 1000));
      if (timerRef.current <= 0) {
        clearInterval(interval);
        window.close();
      }
    }, 1000);
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    verifyEmailApi(params)
      .then(({ success }) => {
        if (Boolean(success)) {
          setSuccess(true);
          startTimer();
        }
      })
      .catch(() => {
        alert('오류가 발생 하였습니다.');
        window.close();
      });
  }, []);

  if (!success) return null;
  return (
    <Box p={2}>
      <Typography variant="subtitle1">{`인증에 성공 하였습니다. 회원 가입 페이지로 돌아가 가입을 진행해주세요`}</Typography>
      <Typography variant="subtitle1">
        {`${timer / 1000}초후 창이 닫힙니다`}
      </Typography>
    </Box>
  );
};

export default EmailVerifyPage;
