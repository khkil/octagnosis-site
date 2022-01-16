import React from 'react';
import { useHistory } from 'react-router-dom';

export const goNextPage = (history, inspectionIdx, currentPage) => {
  if(isNaN(currentPage)){
    alert("유효하지 않은 페이지 입니다.");
    return;
  }
  const nextPage = Number(currentPage) + 1;
  history.push({
    pathname: `/inspections/${inspectionIdx}/pages/${nextPage}`,
    state: currentPage
  })
}

export const goLoginPage = () => {
  window.location.href = "/auth/login"
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;