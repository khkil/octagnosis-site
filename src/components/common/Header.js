import React, { useEffect, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import headerIcon from '../../assets/images/common/logo_octa.png';
import ProgressBar from '../inspections/ProgressBar';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInspectionDetail,
  FETCH_INPECTION_DETAIL,
} from '../../modules/inspection';
import MemberInfoTab from './MemberInfoTab';
import { fetchMemberProgressDetail } from '../../modules/member';
import Timer from '../questions/Timer';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  header: {
    display: 'block',
    width: '100%',
    height: '100%',
    textIndent: '-9999px',
    background: `url(${headerIcon})`,
  },
});

const Header = () => {
  const classes = useStyles();
  const { inspectionIdx, page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { memberIdx, inspectionDetail, isLoading } = useSelector(
    ({ auth, inspection, loading }) => ({
      memberIdx: auth.member && auth.member.idx,
      inspectionDetail: inspection.selected,
      isLoading: loading[FETCH_INPECTION_DETAIL],
    }),
  );

  const goMainPage = () => {
    history.push('/');
  };

  const isStartPage = useMemo(
    () =>
      history.location.pathname === `/inspections/${inspectionIdx}/pages/start`,
    [],
  );
  const showProgress = useMemo(() => !isNaN(page), [page]);

  useEffect(() => {
    if (!inspectionIdx) return;
    dispatch(fetchInspectionDetail(inspectionIdx));
  }, []);

  return (
    <div id="header">
      <div className="container">
        <h1 className="logo white">
          <a className={classes.header} onClick={goMainPage}>
            옥타그노시스 검사
          </a>
        </h1>
        {showProgress && !isLoading && (
          <>
            <Timer />
            <Grid className="progress">
              <p className="txt">{inspectionDetail.inspectionName}</p>
              <ProgressBar
                memberIdx={memberIdx}
                inspectionIdx={inspectionIdx}
                inspectionName={inspectionDetail.inspectionName}
              />
            </Grid>
          </>
        )}
        <MemberInfoTab />
      </div>
    </div>
  );
};

export default Header;
