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

  const handleSubmit = params => {};
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
                  email: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required('이메일을 입력하세요'),
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
                          name="email"
                          label="이메일"
                          variant="filled"
                          onChange={handleChange}
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          autoFocus
                        />
                      </Grid>
                      <Grid item mb={-1}>
                        <LoadingButton
                          type="submit"
                          style={{ background: '#27313e', height: '52px' }}
                          fullWidth
                          loading={loading}
                          variant="outlined"
                        >
                          <Typography style={{ color: 'white' }}>
                            인증링크 메일 보내기
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
