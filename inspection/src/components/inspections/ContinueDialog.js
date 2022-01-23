import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteProgressApi } from '../../api/memberApi';
import { goProgressPage } from '../../utils/common';
import AlertDialog from '../common/AlertDialog';

const ContinueDialog = ({ inspectionIdx, memberIdx, progressDetail }) => {

  const history = useHistory();
  const [continueDialog, setContinueDialog] = useState(false);
  const { currentPage, userCount } = progressDetail;

  const resetInspection = () => {
    deleteProgressApi(memberIdx, inspectionIdx)
    .then(({ success }) => {
      if(success){
        goProgressPage(history, inspectionIdx, 0);
      }else{
        alert("오류 발생");
      }
    })
    .catch((e) => {
      console.error(e);
      alert("server error");
    })
  }

  const continueInspection = () => {
    goProgressPage(history, inspectionIdx, currentPage);
  }

  useEffect(() => {
    
    if(userCount > 0){
      setContinueDialog(true);
    }
    
  }, [])
  return (
    <AlertDialog 
      open={continueDialog} 
      setOpen={setContinueDialog}
      title={"검사를 이어서 진행 하시겠습니까?"}
      content={"취소 버튼 클릭시 이전 문항을 체크했던 이력이 초기화 되고 \n처음 부터 시작가능합니다."}
      onConfirm={continueInspection}
      onCancel={resetInspection}
    />
  )
}

export default ContinueDialog;