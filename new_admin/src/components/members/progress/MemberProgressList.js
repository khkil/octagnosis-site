import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Card,
  Typography,
  Grid,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#27313e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MemberProgressList = () => {
  const progressList = [];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: '10%' }} align="center">
              검사명
            </StyledTableCell>
            <StyledTableCell style={{ width: '67%' }} align="center">
              검사 상태
            </StyledTableCell>
            <StyledTableCell style={{ width: '13%' }} align="center"></StyledTableCell>
            <StyledTableCell style={{ width: '10%' }} align="center">
              결제 상태
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressList.map(({ inspectionIdx, inspectionName, userCount, totalCount, currentPage }) => (
            <div>test</div>
            // <MemberProgress
            //   key={inspectionIdx}
            //   inspectionIdx={inspectionIdx}
            //   inspectionName={inspectionName}
            //   userCount={userCount}
            //   totalCount={totalCount}
            //   currentPage={currentPage}
            // />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberProgressList;
