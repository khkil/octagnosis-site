import React, { memo, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Button,
  TableRow,
  TableCell,
  Table,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { goNextPage } from '../../utils/common';

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
    height: '25px !important',
  },
  startBtn: {
    background: '#007434 !important',
  },
  resultBtn: {
    background: '#27313e !important',
  },
});

const ProgessButton = memo(
  ({ inspectionIdx, progressValue, currentPage, totalCount }) => {
    const classes = useStyles();
    const history = useHistory();

    const startInspection = useCallback(() => {
      history.push(`/inspections/${inspectionIdx}/pages/start`);
    }, [inspectionIdx, progressValue]);

    const continueInspection = useCallback(() => {
      goNextPage(history, inspectionIdx, currentPage, totalCount);
    }, [inspectionIdx, progressValue]);

    const goResultPage = useCallback(() => {
      history.push(`/inspections/${inspectionIdx}/result`);
    }, [inspectionIdx, progressValue]);

    return (
      <Box ml={2}>
        {progressValue === 0 ? (
          <Button
            variant="contained"
            className={classes.startBtn}
            onClick={startInspection}
          >
            검사 시작하기
          </Button>
        ) : progressValue === 100 ? (
          <Button
            variant="contained"
            className={classes.resultBtn}
            onClick={goResultPage}
          >
            결과 보러가기
          </Button>
        ) : (
          <Button variant="contained" onClick={continueInspection}>
            검사 이어하기
          </Button>
        )}
      </Box>
    );
  },
);

const MemberProgress = ({
  inspectionIdx,
  inspectionName,
  userCount,
  totalCount,
  currentPage,
}) => {
  const classes = useStyles();
  const progressValue = useMemo(
    () => (userCount === 0 ? 0 : Math.round((userCount / totalCount) * 100)),
    [userCount, totalCount],
  );

  return (
    <StyledTableRow>
      <TableCell align="center">
        <Typography variant="subtitle2">{inspectionName}</Typography>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '96%', mr: 1 }}>
            <LinearProgress
              className={classes.progressBar}
              variant="determinate"
              value={progressValue}
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {`${progressValue}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <ProgessButton
          inspectionIdx={inspectionIdx}
          progressValue={progressValue}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </TableCell>
      <TableCell align="center">결제 완료</TableCell>
    </StyledTableRow>
  );
};

export default MemberProgress;
