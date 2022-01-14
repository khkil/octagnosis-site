
import React, { useEffect, useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Card, IconButton, InputAdornment, MenuItem, Select } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from "yup";

const theme = createTheme();

const SignupPage = ({ location }) => {

  const isOauthUser = useMemo(() => Boolean(location.state && location.state.userId && location.state.username), [location.state]);
  const [schema, setSchema] = useState({
    phone: Yup.string().required("휴대전화를 입력하세요"),
    email: Yup.string().required("이메일을 입력하세요"),
    school: Yup.string().required("학교명을 입력하세요"),
    education: Yup.string().required("학력을 선택하세요"),
    grade: Yup.string().required("학년을 입력하세요"),
    major: Yup.string().required("전공을 입력하세요"),
  });
  
  const initialValues = {
    id: (isOauthUser ? location.state.userId : ""),
    name: (isOauthUser ? location.state.username : ""),
    password: "",
    password_confirm: "",
    phone: "",
    email: "",
    school: "",
    education: "",
    grade: "",
    major: "",
  }

  const handleSubmit = (data) => {
    console.log(data);
  }

  useEffect(() => {

    if(!isOauthUser){
      setSchema({
        ...schema,
        password: Yup.string().required("비밀번호 입력하세요"),
        password_confirm: Yup.string().required("비밀번호 확인을 입력하세요"),
      });
    }
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
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(schema)}
            onSubmit={(data) => { handleSubmit(data)} }
          >
            {({ values, handleChange, handleSubmit, touched, errors  }) => (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Alert severity="info">기본정보</Alert>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="address"
                    label="주소"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary">
                            asd
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="이메일"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="휴대전화"
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  {!isOauthUser && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="id"
                          label="아이디"
                          type="text"
                          value={values.id}
                          onChange={handleChange}
                          error={Boolean(touched.id && errors.id)}
                          helperText={touched.id && errors.id}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="name"
                          label="이름"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="password"
                          label="비밀번호"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="password_confirm"
                          label="비밀번호 확인"
                          type="password"
                          value={values.password_confirm}
                          onChange={handleChange}
                          error={Boolean(touched.password_confirm && errors.password_confirm)}
                          helperText={touched.password_confirm && errors.password_confirm}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={12}>
                    <Alert severity="info">현재 (최종) 학력 & 현재 직업 정보</Alert>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      name="school"
                      label="학교명"
                      type="text"
                      value={values.school}
                      onChange={handleChange}
                      error={Boolean(touched.school && errors.school)}
                      helperText={touched.school && errors.school}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      select
                      fullWidth
                      name="education"
                      label="학력"
                      value={values.education}
                      onChange={handleChange}
                      error={Boolean(touched.education && errors.education)}
                      helperText={touched.education && errors.education}
                    >
                      <MenuItem value={10}>졸업</MenuItem>
                      <MenuItem value={20}>재학</MenuItem>
                      <MenuItem value={30}>중퇴</MenuItem>
                      <MenuItem value={30}>수료</MenuItem>
                    </TextField>

                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <TextField
                      select
                      fullWidth
                      name="grade"
                      label="학년"
                      type="text"
                      value={values.grade}
                      onChange={handleChange}
                      error={Boolean(touched.grade && errors.grade)}
                      helperText={touched.grade && errors.grade}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="major"
                      label="전공"
                      type="text"
                      value={values.major}
                      onChange={handleChange}
                      error={Boolean(touched.major && errors.major)}
                      helperText={touched.major && errors.major}
                    />
                  </Grid>
                </Grid>
                {JSON.stringify(values)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{'background': '#27313e', height: "52px"}}
                >
                  회원가입
                </Button>
                
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/auth/login" variant="body2">
                      이미 가입 하셨다면? <Typography variant="strong">로그인 하기</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              
            )}
          </Formik>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;