import React, { memo, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import Timer from '../questions/Timer';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMemberProgressDetail,
  FETCH_MEMBER_PROGRESS_DETAIL_REQUEST,
} from '../../modules/member';
import { Redirect, useParams, useHistory } from 'react-router-dom';

const ProgressBar = memo(({ memberIdx, inspectionIdx }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();
  const { memberProgress, loading } = useSelector(({ member, loading }) => ({
    loading: loading[FETCH_MEMBER_PROGRESS_DETAIL_REQUEST],
    memberProgress: member.progressDetail,
  }));

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

  const resultPageUrl = useMemo(
    () => `/inspections/${inspectionIdx}/result`,
    [],
  );

  useEffect(() => {}, [page]);

  if (currentProgress === 100 && history.location.pathname !== resultPageUrl)
    return <Redirect to={resultPageUrl} />;
  return (
    <Grid className="bar-wrap">
      <Grid
        className="bar"
        //style={{ marginRight: `${overallProgress}%` }}
        style={{ marginRight: `${100 - currentProgress}%` }}
      />
      <Grid className="value" style={{ marginLeft: `${currentProgress}%` }}>
        <p>{`${currentProgress}%`}</p>
      </Grid>
    </Grid>
  );
});

export default ProgressBar;
