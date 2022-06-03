import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid } from '@mui/material';
import Loader from '../ui/Loader';
import { Form, Formik } from 'formik';
import { Close, Save } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { groupCodeConfigApi, updateGroupCodeConfigApi } from '../../api/groupApi';

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const GroupCodeConfigPopup = ({ groupIdx, setOpenCodeConfigPopup, openCodeConfigPopup }) => {
  const [form, setForm] = useState({});

  const { isLoading, isError, data, refetch } = useQuery('codeConfig', () => groupCodeConfigApi(groupIdx), {
    refetchOnWindowFocus: false, // window 이동시 재실형 여부
    retry: 0, // 실패시 재호출 횟수
    onSuccess: data => {},
    onError: e => {
      console.error(e.message);
    },
  });

  const handleClose = () => {
    setOpenCodeConfigPopup(false);
  };

  const updateGroupCodeConfig = () => {
    updateGroupCodeConfigApi(groupIdx, {})
      .then(() => {})
      .catch(() => {});
  };

  if (isLoading) {
    return null;
  }

  const { createdDate, expireDate, maxCount } = data.data;
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openCodeConfigPopup} maxWidth={'md'} fullWidth={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        회차코드 관리
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="만료일" name="expireDate" variant="outlined" fullWidth defaultValue={expireDate} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="등록일" variant="outlined" fullWidth value={createdDate} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField label="등록가능 갯수" name="maxCount" variant="outlined" fullWidth defaultValue={maxCount} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="등록중 갯수" variant="outlined" fullWidth disabled />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={handleClose} startIcon={<Save />}>
          설정저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupCodeConfigPopup;
