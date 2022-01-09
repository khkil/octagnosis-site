import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Box, Grid, Typography, LinearProgress, Button, TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const useStyles = makeStyles({
  progressBar: {
    height: "25px !important",
  },
});

const ProgessButton = memo(({ inspectionIdx, progressValue }) => {

  const history = useHistory();

  const goStartPage = useCallback(() => {
    history.push(`/inspections/${inspectionIdx}/pages/start`)
  }, [inspectionIdx, progressValue]);

  const goProgressPage = useCallback(() => {
    const page = 1; //to-do : page 수 check
    history.push(`/inspections/${inspectionIdx}/pages/${page}`)
  }, [inspectionIdx, progressValue]);

  const goResultPage = useCallback(() => {
    const page = 1; //to-do : result page 추후 구현
    history.push(`/inspections/${inspectionIdx}/pages/result`)
  }, [inspectionIdx, progressValue]);

  return (
    <Box ml={2}>
      {progressValue === 0 ? (
        <Button variant="contained" onClick={goStartPage}>검사 시작하기</Button>
      ): progressValue === 100 ?  (
        <Button variant="contained" onClick={goResultPage}>결과 보러가기</Button>
      ) : ( 
        <Button variant="contained" onClick={goProgressPage}>검사 이어하기</Button>
      )}
      
    </Box>
  )
});

const MemberProgress = ({ inspectionIdx, inspectionName, userCount, totalCount }) => {

  const classes = useStyles();
  const progressValue = useMemo(() => Math.round(userCount / totalCount * 100), [userCount, totalCount]);

  return (
    <StyledTableRow>
      <TableCell align="center">
        <Typography variant="subtitle2">{inspectionName}</Typography>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '83%', mr: 1 }}>
            <LinearProgress className={classes.progressBar} variant="determinate" value={progressValue} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {`${progressValue}%`}
            </Typography>
          </Box>
          <ProgessButton 
            inspectionIdx={inspectionIdx}
            progressValue={progressValue}
          />
        </Box>
      </TableCell>
      <TableCell align="center">결제 완료</TableCell>
    </StyledTableRow>
  );
}

export default MemberProgress;