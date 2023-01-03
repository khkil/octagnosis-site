import { Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  checkProgressHistoryApi,
  deleteProgressApi,
} from '../../api/memberApi';
import { goNextPage } from '../../utils/common';
import AlertDialog from '../common/AlertDialog';

const ContinueDialog = ({ inspectionIdx, memberIdx }) => {
  const history = useHistory();
  const [continueDialog, setContinueDialog] = useState(false);
  const [progressHistory, setProgressHistory] = useState({
    currentPage: 0,
    totalPage: 0,
  });

  const resetInspection = () => {
    deleteProgressApi(memberIdx, inspectionIdx)
      .then(({ success }) => {
        if (success) {
          goNextPage(history, inspectionIdx, 0);
        } else {
          alert('오류 발생');
        }
      })
      .catch(e => {
        console.error(e);
        alert('server error');
      });
  };

  const checkHistory = () => {
    checkProgressHistoryApi(inspectionIdx)
      .then(({ success, data }) => {
        const { currentPage } = data;
        if (Boolean(success) && currentPage > 0) {
          setProgressHistory({
            ...progressHistory,
            ...data,
          });
          setContinueDialog(true);
        }
      })
      .catch(() => {
        alert('히스토리를 가져는중 오류가 발생 하였습니다.');
      });
  };

  const continueInspection = () => {
    goNextPage(history, inspectionIdx, progressHistory.currentPage);
  };

  useEffect(() => {
    checkHistory();
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
