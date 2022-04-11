import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { StyledTableCell } from '../members/MemberList';

const GroupList = ({ groupList }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">이메일</StyledTableCell>
            <StyledTableCell align="center">연락처</StyledTableCell>
            <StyledTableCell align="center">가입일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupList.map(() => (
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">이름</StyledTableCell>
              <StyledTableCell align="center">이메일</StyledTableCell>
              <StyledTableCell align="center">연락처</StyledTableCell>
              <StyledTableCell align="center">가입일</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupList;
