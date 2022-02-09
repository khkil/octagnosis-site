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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchInspectionDetail } from '../../modules/inspection';

const initialValues = {};
const validateSchema = {
  inspectionName: Yup.string().required('검사명을 입력하세요'),
};

const InspectionDetailInfo = () => {
  const dispatch = useDispatch();
  const handleSubmit = data => {
    console.log(data);
  };

  useEffect(() => {
    const inspectionIdx = location.pathname.split('inspections/')[1];
    dispatch(fetchInspectionDetail(inspectionIdx));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
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
                name="phone"
                label="휴대전화"
                type="text"
                value={values.phone}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">기타정보</Alert>
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

            <Grid item xs={12} sm={1.5}>
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
            <Grid item xs={12} sm={4.5}>
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

            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                name="job"
                label="직업"
                type="text"
                value={values.job}
                onChange={handleChange}
                error={Boolean(touched.job && errors.job)}
                helperText={touched.job && errors.job}
              >
                <MenuItem value={10}>졸업</MenuItem>
                <MenuItem value={20}>재학</MenuItem>
                <MenuItem value={30}>중퇴</MenuItem>
                <MenuItem value={30}>수료</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                name="company"
                label="회사명"
                type="text"
                value={values.company}
                onChange={handleChange}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="jobDetail"
                label="업무 내용(업무에 대한 간단 서술)"
                type="text"
                value={values.jobDetail}
                onChange={handleChange}
                error={Boolean(touched.jobDetail && errors.jobDetail)}
                helperText={touched.jobDetail && errors.jobDetail}
              />
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
  );
};

export default InspectionDetailInfo;
