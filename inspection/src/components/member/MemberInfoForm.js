import React, { useEffect, useState } from 'react';
import { Container, Avatar, Button, TextField, Link, Grid, Box, Typography, Alert, Card, IconButton, InputAdornment, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik } from 'formik';
import * as Yup from "yup";
import FindAddressPopup from "../../components/common/FindAddressPopup"
import { phoneRegExp } from '../../utils/common';


const MemberInfoForm = ({ isOauthUser, initialValues, handleSubmit, submitButtonText }) => {

  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [schema, setSchema] = useState({
    phone: Yup.string().required("휴대전화를 입력하세요").matches(phoneRegExp, '휴대폰 번호 양식에 맞게 입력하세요'),
    email: Yup.string().required("이메일을 입력하세요").email("이메일 형식에 맞게 입력하세요"),
    address: Yup.string().required("주소를 입력하세요"),
    //address_sub: Yup.string().required("상세주소를 입력하세요"),
    school: Yup.string().required("학교명을 입력하세요"),
    education: Yup.string().required("학력을 선택하세요"),
    grade: Yup.string().required("학년을 입력하세요"),
    major: Yup.string().required("전공을 입력하세요"),
    job: Yup.string().required("직업을 입력하세요"),
    company: Yup.string().required("회사를 입력하세요"),
    jobDetail: Yup.string().required("업무 내용을 입력하세요"),
  });

  const showAddressPopup = (e) => {
    e.preventDefault();
    setOpenAddressPopup(true);
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
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(schema)}
      onSubmit={(data) => { handleSubmit(data)} }
    >
      {({ values, setValues, handleChange, handleSubmit, touched, errors  }) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Alert severity="info">기본정보</Alert>
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
                name="phone"
                label="휴대전화"
                type="text"
                value={values.phone}
                onChange={handleChange}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Grid>

            <Grid item xs={12} sm={8} >
              <TextField
                fullWidth
                name="address"
                label="주소"
                type="text"
                value={values.address}
                onChange={handleChange}
                onClick={showAddressPopup}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary">
                        <SearchIcon/>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FindAddressPopup 
                open={openAddressPopup}
                setOpen={setOpenAddressPopup}
                onComplete={data => { 
                  const { address, zonecode } = data;
                  setValues({
                    ...values,
                    address: address,
                  })
                  console.log(data);
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="address_sub"
                label="상세주소"
                type="text"
                value={values.address_sub ? values.address_sub : ""}
                onChange={handleChange}
                error={Boolean(touched.address_sub && errors.address_sub)}
                helperText={touched.address_sub && errors.address_sub}
                
              />
            </Grid>
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
          <Grid style={{textAlign: "center"}}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              style={{'background': '#27313e', height: "52px"}}
            >
              {submitButtonText}
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
  )
}

export default MemberInfoForm;