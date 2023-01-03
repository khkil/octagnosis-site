import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { sendFindIdEmailApi } from '../../api/authApi';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    paddingRight: '30%',
    paddingLeft: '30%',
    paddingTop: '250px',
  },
  form: {
    padding: 25,
    textAlign: 'center',
  },
});

const FindIdPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = params => {
    setLoading(true);
    sendFindIdEmailApi(params)
      .then(d => {
        setLoading(false);
        alert('');
      })
      .catch(({ response }) => {
        setLoading(false);
        if (response.data && response.data.msg) {
          alert(response.data.msg);
        }
      });
  };
  const classes = useStyles();

  return (
    <Container>
      <Box container spacing={0} justify="center">
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          className={classes.root}
        >
          <Paper variant="elevation" elevation={2} className={classes.form}>
            <Grid item>
              <Formik
                initialValues={{
                  toEmail: '',
                }}
                validationSchema={Yup.object().shape({
                  toEmail: Yup.string()
                    .required('이메일을 입력하세요')
                    .email('이메일 형식에 맞게 입력하세요'),
                })}
                onSubmit={(data, props) => {
                  handleSubmit(data);
                }}
              >
                {({ values, handleChange, handleSubmit, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography variant="body2">
                          가입 시 입력한 이메일을 입력해주세요
                        </Typography>
                        <Typography variant="body2">
                          화면에 입력하신 이메일로 인증링크가 발송 됩니다
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          name="toEmail"
                          label="이메일"
                          variant="filled"
                          onChange={handleChange}
                          value={values.email}
                          error={Boolean(touched.toEmail && errors.toEmail)}
                          helperText={touched.toEmail && errors.toEmail}
                          autoFocus
                        />
                      </Grid>
                      <Grid item mb={-1}>
                        <LoadingButton
                          type="submit"
                          fullWidth
                          loading={loading}
                          variant="contained"
                          style={{ height: '56px' }}
                        >
                          <Typography variant="subtitle1">
                            인증 메일 발송
                          </Typography>
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </Container>
  );
};
export default FindIdPage;
