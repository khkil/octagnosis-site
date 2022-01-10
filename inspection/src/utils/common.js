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