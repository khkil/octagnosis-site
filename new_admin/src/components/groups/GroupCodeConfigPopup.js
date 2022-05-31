import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid } from '@mui/material';
import Loader from '../ui/Loader';
import { Form, Formik } from 'formik';
import { Close, Save } from '@mui/icons-material';
import { groupCodeConfigApi } from '../../api/groupApi';

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
  const handleClose = () => {
    setOpenCodeConfigPopup(false);
  };

  useEffect(() => {
    console.log('test');
  }, []);
  const { isLoading, isError, data, error } = useQuery('todos', () => groupCodeConfigApi(groupIdx), {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
    },
    onError: e => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openCodeConfigPopup} maxWidth={'md'} fullWidth={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        회차코드 관리
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Loader />
        <Grid container>
          <Grid item xs={6}>
            3
          </Grid>
          <Grid item xs={6}>
            3
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={handleClose} startIcon={<Save />}>
          설정저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* const GroupCodeConfigPopup = ({ openCodeConfigPopup, setOpenCodeConfigPopup }) => {
  const result = useQuery('/api/admin/groups/1/code-config');
  console.log(result);
  const handleClose = () => {
    setOpenCodeConfigPopup(false);
  };

  useEffect(() => {}, []);

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openCodeConfigPopup} maxWidth={'md'} fullWidth={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        회차코드 관리
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Loader />
        <Grid container>
          <Grid item xs={6}>
            3
          </Grid>
          <Grid item xs={6}>
            3
          </Grid>
        </Grid>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
          rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
          et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
        </Typography> 
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={handleClose} startIcon={<Save />}>
          설정저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}; */

export default GroupCodeConfigPopup;
