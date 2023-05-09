import { Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkProgressHistoryApi, deleteMemberAnswerApi } from '../../api/memberApi';
import { goPage as goInspectionPage, goPage } from '../../utils/common';
import AlertDialog from '../common/AlertDialog';

const ContinueDialog = ({ inspectionIdx, memberIdx }) => {
  const history = useHistory();
  const [continueDialog, setContinueDialog] = useState(false);
  const [progressHistory, setProgressHistory] = useState({
    currentPage: 0,
    totalPage: 0,
  });

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

  const resetInspection = () => {
    deleteMemberAnswerApi(inspectionIdx)
      .then(({ success }) => {
        if (success) {
          goPage(history, inspectionIdx, 1);
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
    goInspectionPage(history, inspectionIdx, progressHistory.currentPage + 1);
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
        <Typography variant="caption">
          <Typography variant="button" color="error">
            처음부터 하기
          </Typography>{' '}
          버튼 클릭시 이전에 검사하신 내역은 사라집니다.
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
