import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField } from '@mui/material';

const GroupForm = () => {
  return (
    <Formik
      initialValues={{
        id: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required('아이디를 입력하세요'),
        password: Yup.string().max(255).required('비밀번호를 입력하세요'),
      })}
      onSubmit={(data, props) => {
        handleSubmit(data);
      }}
    >
      {({ values, handleChange, handleSubmit, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <Grid item>
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
              {/*   <LoadingButton
                type="submit"
                style={{ background: '#27313e' }}
                fullWidth
                loading={isLoading}
                variant="outlined"
              >
                {isLoading ? (
                  <CircularProgress size={24} style={{ color: 'white' }} />
                ) : (
                  <Typography style={{ color: 'white' }}>로그인</Typography>
                )}
              </LoadingButton> */}
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
export default GroupForm;
