import React, { useEffect, useState } from 'react';
import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Alert,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import Loader from '../ui/Loader';

const validateSchema = {
  inspectionName: Yup.string().required('검사명을 입력하세요'),
};

const InspectionDetailInfo = ({ inspectionDetail }) => {
  const handleSubmit = data => {
    console.log(data);
  };

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
                <Alert severity="info">기본정보</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  type="text"
                  value={values.rankCount}
                  onChange={handleChange}
                  error={Boolean(touched.rankCount && errors.rankCount)}
                  helperText={touched.rankCount && errors.rankCount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="showYn"
                  label="결제 여부"
                  type="text"
                  value={values.showYn}
                  onChange={handleChange}
                  error={Boolean(touched.showYn && errors.showYn)}
                  helperText={touched.showYn && errors.showYn}
                >
                  <MenuItem value="Y">유료검사</MenuItem>
                  <MenuItem value="N">무료검사</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name="showYn"
                  label="표시 여부"
                  type="text"
                  value={values.showYn}
                  onChange={handleChange}
                  error={Boolean(touched.showYn && errors.showYn)}
                  helperText={touched.showYn && errors.showYn}
                >
                  <MenuItem value="Y">표시</MenuItem>
                  <MenuItem value="N">숨김</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Alert severity="info">기타정보</Alert>
              </Grid>
            </Grid>
            <Grid style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: '#27313e', height: '52px' }}
              >
                수정
              </Button>
            </Grid>

            {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                이미 가입 하셨다면? <Typography variant="strong">로그인 하기</Typography>
              </Link>
            </Grid>
          </Grid> */}
          </Box>
        )}
      </Formik>
    </Paper>
  );
};

export default InspectionDetailInfo;