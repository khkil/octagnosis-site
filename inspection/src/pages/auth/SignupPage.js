import React, { useEffect, useMemo } from 'react';
import { Container, Avatar, Typography, Card } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MemberInfoForm from '../../components/member/MemberInfoForm';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../modules/auth';

const SignupPage = ({ location }) => {
  const dispatch = useDispatch();
  const isSignUpPage = useMemo(
    () => location.pathname.indexOf('/auth/sign-up') > -1,
    [location.state],
  );
  const isOauthUser = useMemo(
    () =>
      Boolean(
        location.state && location.state.userId && location.state.username,
      ),
    [location.state],
  );

  const initialValues = {
    id: isOauthUser ? location.state.userId : '',
    name: isOauthUser ? location.state.username : '',
    password: '',
    passwordConfirm: '',
    phone: '',
    email: '',
    address: '',
    addressSub: '',
    school: '',
    education: '',
    grade: '',
    major: '',
    job: '',
    company: '',
    jobDetail: '',
    groupCode: '',
    verifiedId: false,
    verifiedEmail: false,
    verifiedCode: false,
  };

  const handleSubmit = data => {
    const params = {
      role: 'ROLE_MEMBER',
      ...data,
    };
    dispatch(signUpRequest(params));
  };

  useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="lg">
      <Card
        sx={{
          padding: 3,
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <MemberInfoForm
          isSignUpPage={isSignUpPage}
          isOauthUser={isOauthUser}
          //useEmailAuth={true} 삭제
          useEmailAuth={false}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          submitButtonText="회원가입"
        />
      </Card>
    </Container>
  );
};

export default SignupPage;
