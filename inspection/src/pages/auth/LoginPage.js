import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  Container,
  Box,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    minHeight: "90vh",
    padding: 350,
  },
  form: {
    padding: 25,
    textAlign: "center"
  }
})

const LoginPage = () => {
 
  const classes = useStyles();
  return (
    <Container>
      <Box container spacing={0} justify="center" direction="row">
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          className={classes.root}
        >
          <Paper
            variant="elevation"
            elevation={2}
            className={classes.form}
          >
            <Grid item>
              <Typography component="h1" variant="h5">
                로그인
              </Typography>
            </Grid>
            <Grid item>
              <Formik 
                initialValues={{ 
                  id: "", password: "" 
                }}
                validationSchema={Yup.object().shape({
                  id: Yup.string().required("아이디를 입력하세요"),
                  password: Yup.string().max(255).required("비밀번호를 입력하세요"),
                })}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(data);
                  setSubmitting(false);
                }}
              >
              {({ values, handleChange, handleSubmit, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        fullWidth
                        name="id"
                        label="아이디"
                        variant="filled"
                        onChange={handleChange}
                        value={values.id}
                        error={Boolean(touched.id && errors.id)}
                        helperText={touched.id && errors.id}
                        
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        name="password"
                        label="비밀번호"
                        variant="filled"
                        onChange={handleChange}
                        value={values.password}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item mb={2}>
                      <Button
                        style={{'background': '#27313e'}}
                        fullWidth
                        type="submit"
                        className="button-block"
                      >
                        <Typography style={{'color': 'white'}}>로그인</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </form> 
              )}

              </Formik>
              {/* <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      label="아이디"
                      autoFocus
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      label="비밀번호"
                    />
                  </Grid>
                  <Grid item mb={2}>
                    <Button
                      style={{'background': '#27313e'}}
                      fullWidth
                      type="submit"
                      className="button-block"
                    >
                      <Typography style={{'color': 'white'}}>로그인</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form> */}
            </Grid>
            <Grid item>
              <Link href="#" style={{float: "left"}}>
                회원 가입
              </Link>
              <Link href="#" style={{float: "right"}}>
                계정 찾기
              </Link>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </Container>
  );
}
export default LoginPage;