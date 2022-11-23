import React, { memo, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import Timer from '../questions/Timer';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMemberProgressDetail,
  FETCH_MEMBER_PROGRESS_DETAIL_REQUEST,
} from '../../modules/member';
import { useParams } from 'react-router-dom';

const ProgressBar = memo(({ memberIdx, inspectionIdx }) => {
  const dispatch = useDispatch();
  const { memberProgress, loading } = useSelector(({ member, loading }) => ({
    loading: loading[FETCH_MEMBER_PROGRESS_DETAIL_REQUEST],
    memberProgress: member.progressDetail,
  }));
  const { page } = useParams();

  useEffect(() => {
    dispatch(
      fetchMemberProgressDetail({
        memberIdx: memberIdx,
        inspectionIdx: inspectionIdx,
      }),
    );
  }, [page]);

  const currentProgress = useMemo(() =>
    memberProgress.progress ? memberProgress.progress : 0,
  );

  useEffect(() => {}, [page]);

  console.log(loading, memberProgress);

  return (
    <Grid className="bar-wrap">
      <Grid
        className="bar"
        //style={{ marginRight: `${overallProgress}%` }}
        style={{ marginRight: `${100 - currentProgress}%` }}
      />
      <Grid className="value" style={{ marginLeft: `${currentProgress}%` }}>
        {`${currentProgress}%`}
      </Grid>
    </Grid>
  );
});

export default ProgressBar;
