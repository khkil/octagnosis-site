import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, Card, Typography } from '@mui/material';
import MemberProgress from './MemberProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#27313e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const MemberProgressList = ({ progressList }) => {
  return (
    <Box mt={2}>
      <Card mb={6}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            검사 상태
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "10%" }} align="center" >검사명</StyledTableCell>
                  <StyledTableCell style={{ width: "80%" }} align="center">검사 상태</StyledTableCell>
                  <StyledTableCell style={{ width: "10%" }} align="center">결제 상태</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {progressList.map(({ 
                  inspectionIdx, 
                  inspectionName, 
                  userCount, 
                  totalCount,
                  currentPage
                }) => (
                  <MemberProgress 
                    key={inspectionIdx}
                    inspectionIdx={inspectionIdx}
                    inspectionName={inspectionName}
                    userCount={userCount}
                    totalCount={totalCount}
                    currentPage={currentPage}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Box>
  );
}

export default MemberProgressList;