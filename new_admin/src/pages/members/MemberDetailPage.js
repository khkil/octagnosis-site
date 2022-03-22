import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Grid, Box, Alert, MenuItem, Paper } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MemberProgressList from '../../components/members/progress/MemberProgressList';

const MemberDetailPage = ({ inspectionDetail }) => {
  const { memberIdx } = useParams();
  const validateSchema = {
    inspectionName: Yup.string().required('검사명을 입력하세요'),
  };

  const handleSubmit = data => {
    console.log(data);
  };

  useEffect(() => {
    console.log(memberIdx);
  }, []);

  return (
    <Paper>
      <Formik
        initialValues={inspectionDetail}
        validationSchema={Yup.object().shape(validateSchema)}
        onSubmit={data => {
          handleSubmit(data);
        }}
      >
        {({ values, setValues, handleChange, handleSubmit, touched, errors }) => (
          <Box component="form" onSubmit={handleSubmit} p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Alert severity="info">회원정보</Alert>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="inspectionName"
                  label="검사명"
                  type="text"
                  value={values.inspectionName}
                  onChange={handleChange}
                  error={Boolean(touched.inspectionName && errors.inspectionName)}
                  helperText={touched.inspectionName && errors.inspectionName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="rankCount"
                  type="number"
                  label="결과지 결과 갯수"
                  value={values.rankCount}
                  onChange={handleChange}
                  error={Boolean(touched.rankCount && errors.rankCount)}
                  helperText={touched.rankCount && errors.rankCount}
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <Alert severity="success">검사 진행 상황</Alert>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MemberProgressList />
              </Grid>
              {/*   <Grid container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ background: '#27313e', height: '52px' }}
                >
                  수정
                </Button>
              </Grid> */}
            </Grid>
          </Box>
        )}
      </Formik>
    </Paper>
  );
};

export default MemberDetailPage;
