
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Avatar, Button, TextField, Link, Grid, Box, Typography, Alert, Card, IconButton, InputAdornment, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MemberInfoForm from '../../components/member/MemberInfoForm';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../modules/auth';

const theme = createTheme();

const SignupPage = ({ location }) => {

  const dispatch = useDispatch();

  const isOauthUser = useMemo(() => Boolean(location.state && location.state.userId && location.state.username), [location.state]);

  const initialValues = {
    id: (isOauthUser ? location.state.userId : ""),
    name: (isOauthUser ? location.state.username : ""),
    password: "",
    password_confirm: "",
    phone: "",
    email: "",
    address: "",
    addressSub: "",
    school: "",
    education: "",
    grade: "",
    major: "",
    job: "",
    company: "",
    jobDetail: ""
  }

  const handleSubmit = (data) => {
    const params = {
      role: "ROLE_MEMBER",
      ...data
    }
    dispatch(signUpRequest(params));
  }

  useEffect(() => {
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
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
            isOauthUser={isOauthUser}
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            submitButtonText="회원가입"
          />
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;