import { Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteProgressApi } from '../../api/memberApi';
import { goProgressPage } from '../../utils/common';
import AlertDialog from '../common/AlertDialog';

const ContinueDialog = ({
  inspectionIdx,
  memberIdx,
  progressDetail,
  totalPage,
}) => {
  const history = useHistory();
  const [continueDialog, setContinueDialog] = useState(false);
  const { currentPage, userCount } = progressDetail;

  const resetInspection = () => {
    deleteProgressApi(memberIdx, inspectionIdx)
      .then(({ success }) => {
        if (success) {
          goProgressPage(history, inspectionIdx, 0);
        } else {
          alert('오류 발생');
        }
      })
      .catch(e => {
        console.error(e);
        alert('server error');
      });
  };

  const continueInspection = () => {
    goProgressPage(history, inspectionIdx, currentPage);
  };

  const goResultPage = () => {
    history.push(`/inspections/${inspectionIdx}/result`);
  };

  const showDialog = useMemo(() => userCount > 0, [userCount]);

  useEffect(() => {
    if (currentPage === totalPage) {
      goResultPage();
    } else if (showDialog) {
      setContinueDialog(true);
    }
  }, []);
  return (
    <AlertDialog
      open={continueDialog}
      setOpen={setContinueDialog}
      title={'검사를 이어서 진행 하시겠습니까?'}
      content={
        <Typography>
          취소 버튼 클릭시 이전 문항을 체크했던 이력이 <strong>초기화</strong>
          되고 <br />
          처음 부터 시작가능합니다.
        </Typography>
      }
      onConfirm={continueInspection}
      onCancel={resetInspection}
      confirmButtonText={<Typography>이어서 하기</Typography>}
      cancelButtonText={<Typography>처음부터 하기</Typography>}
    />
  );
};

export default ContinueDialog;


