import React from 'react';
import { useHistory } from 'react-router-dom';

export const goProgressPage = (
  history,
  inspectionIdx,
  currentPage,
  totalPage,
) => {
  if (isNaN(currentPage) && currentPage !== 'end' && currentPage !== 'start') {
    alert('유효하지 않은 페이지 입니다.');
    return;
  }
  const nextPage =
    totalPage && totalPage == currentPage ? 'end' : Number(currentPage) + 1;
  history.push({
    pathname: `/inspections/${inspectionIdx}/pages/${nextPage}`,
    state: currentPage,
  });
};

export const goLoginPage = () => {
  window.location.href = '/auth/login';
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
