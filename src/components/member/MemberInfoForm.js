import React, { useEffect, useMemo, useState } from 'react';
import { Button, TextField, Grid, Box, Typography, Alert, IconButton, InputAdornment, MenuItem, BottomNavigationAction, BottomNavigation } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FindAddressPopup from '../../components/common/FindAddressPopup';
import VerifyIdButton from './VerifyIdButton';
import VerifyEmailButton from './VerifyEmailButton';
import { Groups, Person, Save } from '@mui/icons-material';
import PasswordResetButton from './PasswordResetButton';
import { MEMBER_TYPE_GROUP, MEMBER_TYPE_INDIVIDUAL } from '../../constants';
import VerifyCodeButton from './VerifyCodeButton';
import { phoneRegExp } from '../../utils/common';
import { memberGroupApi } from '../../api/memberApi';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'black!important',
    '&$selected': {
      background: '#27313e;!important',
      color: 'white!important',
    },
  },
  selected: {},
}));

const GroupInfo = () => {
  const [group, setGroup] = useState({});
  const { idx } = useSelector(({ auth }) => auth.member);
  useEffect(() => {
    memberGroupApi(idx)
      .then(({ data }) => {
        setGroup(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Alert severity="info">단체 정보</Alert>
      </Grid>
      {group.idx && (
        <Grid item xs={12} sm={6}>
          <TextField value={group.name} label="단체명" disabled fullWidth />
        </Grid>
      )}
    </>
  );
};

const MemberInfoForm = ({ isSignUpPage, isOauthUser, useEmailAuth, initialValues, handleSubmit, submitButtonText }) => {
  const classes = useStyles();
  const [memberType, setMemberType] = useState(MEMBER_TYPE_INDIVIDUAL);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);

  const selectGroup = useMemo(() => memberType === MEMBER_TYPE_GROUP, [memberType]);

  const isGroupMember = useMemo(() => Boolean(initialValues.groupIdx && initialValues.groupIdx > 0), [initialValues.groupIdx]);

  const createValidationSchema = useMemo(() => {
    let defaultSchema = {
      id: Yup.string().required('아이디를 입력하세요'),
      name: Yup.string().required('이름을 입력하세요'),
      phone: Yup.string().required('휴대전화를 입력하세요').matches(phoneRegExp, '휴대폰 번호 양식에 맞게 입력하세요'),
      email: Yup.string().required('이메일을 입력하세요').email('이메일 형식에 맞게 입력하세요'),
      address: Yup.string().required('주소를 입력하세요'),
      school: Yup.string().required('학교명을 입력하세요'),
      education: Yup.string().required('학력을 선택하세요'),
      grade: Yup.string().required('학년을 입력하세요'),
      major: Yup.string().required('전공을 입력하세요'),
      job: Yup.string().required('직업을 입력하세요'),
      company: Yup.string().required('회사를 입력하세요'),
      jobDetail: Yup.string().required('업무 내용을 입력하세요'),
    };

    if (!isOauthUser) {
      defaultSchema = {
        ...defaultSchema,
        verifiedId: Yup.boolean().oneOf([true], '아이디 중복체크를 해주세요'),
        password: Yup.string().required('비밀번호를 입력하세요'),
        passwordConfirm: Yup.string()
          .required('비밀번호 확인을 입력하세요')
          .oneOf([Yup.ref('password'), null], '패스워드가 일치하지 않습니다.'),
      };

      if (useEmailAuth) {
        defaultSchema = {
          ...defaultSchema,
          verifiedEmail: Yup.boolean().oneOf([true], '이메일 인증을 완료해주세요'),
        };
      }

      if (selectGroup) {
        defaultSchema = {
          ...defaultSchema,
          groupCode: Yup.string().required('단체코드를 입력하세요'),
          verifiedCode: Yup.boolean().oneOf([true], '단체코드 인증을 완료해주세요'),
        };
      }
    }
    console.log(memberType);

    return defaultSchema;
  }, [memberType]);

  const showAddressPopup = e => {
    e.preventDefault();
    setOpenAddressPopup(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(createValidationSchema)}
      onSubmit={data => {
        handleSubmit(data);
      }}
    >
      {({ values, setValues, handleChange, handleSubmit, touched, errors }) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {isSignUpPage && (
              <>
                <Grid item xs={12} sm={12}>
                  <Alert severity="info">회원 구분</Alert>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BottomNavigation
                    classes={classes}
                    showLabels
                    value={memberType}
                    onChange={(event, newValue) => {
                      setMemberType(newValue);
                      setValues({
                        ...values,
                        groupCode: '',
                        verifiedCode: false,
                      });
                    }}
                  >
                    <BottomNavigationAction value={MEMBER_TYPE_INDIVIDUAL} classes={classes} label="개인 회원" icon={<Person />} />
                    <BottomNavigationAction value={MEMBER_TYPE_GROUP} classes={classes} label="단체 회원" icon={<Groups />} />
                  </BottomNavigation>
                </Grid>
                {selectGroup && (
                  <>
                    <Grid item xs={12} sm={4.5}>
                      <TextField
                        fullWidth
                        name="groupCode"
                        label="단체코드"
                        type="text"
                        value={values.groupCode}
                        onChange={e => {
                          setValues({
                            ...values,
                            groupCode: e.target.value,
                            verifiedCode: false,
                          });
                        }}
                        error={Boolean((touched.groupCode && errors.groupCode) || (touched.verifiedCode && errors.verifiedCode))}
                        helperText={touched.groupCode && (errors.groupCode ? errors.groupCode : errors.verifiedCode)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={1.5}>
                      <VerifyCodeButton
                        code={values.groupCode}
                        hasError={errors.groupCode}
                        setVerifiedCode={isVerified => {
                          setValues({ ...values, verifiedCode: isVerified });
                        }}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}

            <Grid item xs={12} sm={12}>
              <Alert severity="info">기본정보</Alert>
            </Grid>
            {!isOauthUser && (
              <>
                <Grid item xs={12} sm={isSignUpPage ? 4.5 : 6}>
                  <TextField
                    fullWidth
                    name="id"
                    label="아이디"
                    disabled={!isSignUpPage}
                    type="text"
                    value={values.id}
                    onChange={e => {
                      setValues({
                        ...values,
                        id: e.target.value,
                        verifiedId: false,
                      });
                    }}
                    error={Boolean((touched.id && errors.id) || (touched.verifiedId && errors.verifiedId))}
                    helperText={touched.id && (errors.id ? errors.id : errors.verifiedId)}
                    autoFocus
                  />
                </Grid>
                {isSignUpPage && (
                  <Grid item xs={12} sm={1.5}>
                    <VerifyIdButton
                      value={values.id}
                      hasError={errors.id}
                      setVerifiedId={isVerified => {
                        setValues({ ...values, verifiedId: isVerified });
                      }}
                    />
                  </Grid>
                )}

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
                {isSignUpPage && (
                  <>
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
                        name="passwordConfirm"
                        label="비밀번호 확인"
                        type="password"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                        helperText={touched.passwordConfirm && errors.passwordConfirm}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}

            <Grid item xs={12} sm={useEmailAuth ? 4.5 : 6}>
              <TextField
                fullWidth
                name="email"
                label="이메일"
                type="text"
                value={values.email}
                onChange={handleChange}
                error={Boolean((touched.email && errors.email) || (touched.verifiedEmail && errors.verifiedEmail))}
                helperText={touched.email && (errors.email ? errors.email : errors.verifiedEmail)}
              />
            </Grid>
            {useEmailAuth && (
              <Grid item xs={12} sm={1.5}>
                <VerifyEmailButton
                  email={values.email}
                  verifiedEmail={values.verifiedEmail}
                  setVerifiedEmail={isVerified => {
                    setValues({ ...values, verifiedEmail: isVerified });
                  }}
                />
              </Grid>
            )}

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

            <Grid item xs={12} sm={8}>
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
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FindAddressPopup
                open={openAddressPopup}
                setOpen={setOpenAddressPopup}
                onComplete={({ address }) => {
                  setValues({
                    ...values,
                    address: address,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="addressSub"
                label="상세주소"
                type="text"
                value={values.addressSub ? values.addressSub : ''}
                onChange={handleChange}
                error={Boolean(touched.addressSub && errors.addressSub)}
                helperText={touched.addressSub && errors.addressSub}
              />
            </Grid>
            {!isSignUpPage && !isOauthUser && (
              <Grid item xs={12} sm={12}>
                <PasswordResetButton />
              </Grid>
            )}

            {isGroupMember && <GroupInfo />}

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
                <MenuItem value={'졸업'}>졸업</MenuItem>
                <MenuItem value={'재학'}>재학</MenuItem>
                <MenuItem value={'중퇴'}>중퇴</MenuItem>
                <MenuItem value={'수료'}>수료</MenuItem>
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
              <TextField fullWidth name="job" label="직업" type="text" value={values.job} onChange={handleChange} error={Boolean(touched.job && errors.job)} helperText={touched.job && errors.job} />
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
            <Button type="submit" variant="contained" size="large" sx={{ mt: 3, mb: 2 }} style={{ height: '52px' }} startIcon={<Save />}>
              <Typography variant="h6">{submitButtonText}</Typography>
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

export default MemberInfoForm;
