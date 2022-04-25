import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { resetPasswordApi } from '../../api/authApi';

const initialValues = {
  password: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('현재 비밀번호를 입력하세요'),
  newPassword: Yup.string().required('새 비밀번호를 입력하세요'),
  newPasswordConfirm: Yup.string()
    .required('비밀번호 확인을 입력하세요')
    .oneOf([Yup.ref('newPassword'), null], '패스워드가 일치하지 않습니다.'),
});

const PasswordResetPopup = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const handleClose = callback => {
    callback();
    setOpen(false);
  };

  const handleSubmit = (data, functions) => {
    const { resetForm } = functions;
    console.log(functions.resetForm);

    setLoading(true);
    resetPasswordApi(data)
      .then(({ success }) => {
        if (Boolean(success)) {
          setLoading(false);
          alert('비밀번호가 변경되었습니다.');
          handleClose(resetForm);
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        }
      })
      .catch(e => {
        console.error(e.response);
        if (e.response) {
          const { msg } = e.response.data;
          setLoading(false);
          alert(msg);
        }
      });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, handleChange, handleSubmit, resetForm }) => (
        <Dialog open={open}>
          <DialogTitle>비밀번호 초기화</DialogTitle>
          <DialogContent>
            <DialogContentText>
              기존 비밀번호와 변경할 새 비밀번호를 양식에 맞게 입력해주세요.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="현재 비밀번호"
              type="password"
              name="password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              margin="dense"
              label="새 비밀번호"
              type="password"
              name="newPassword"
              fullWidth
              value={values.newPassword}
              onChange={handleChange}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />
            <TextField
              margin="dense"
              label="새 비밀번호 확인"
              name="newPasswordConfirm"
              type="password"
              fullWidth
              value={values.newPasswordConfirm}
              onChange={handleChange}
              error={Boolean(
                touched.newPasswordConfirm && errors.newPasswordConfirm,
              )}
              helperText={
                touched.newPasswordConfirm && errors.newPasswordConfirm
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleClose(resetForm);
              }}
            >
              닫기
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => {
                const functions = () => {
                  resetForm();
                };
                handleSubmit(values, functions);
              }}
            >
              변경하기
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default PasswordResetPopup;
