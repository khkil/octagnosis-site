import React, { useEffect, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import headerIcon from '../../assets/images/common/logo_octa.png';
import ProgressBar from '../inspections/ProgressBar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import UserInfoTab from './UserInfoTab';

const useStyles = makeStyles({
  header: {
    display: "block",
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    background: `url(${headerIcon})`
  },
})


const Header = () => {
  
  const classes = useStyles();
  const params = useParams();

  const dispatch = useDispatch();
  const { inspectionDetail } = useSelector(({ loading, inspection }) => ({
    isLoading: loading[FETCH_INPECTION_DETAIL],
    inspectionDetail: inspection.selected
  }));

  const { inspectionIdx, inspectionName, totalPage } = inspectionDetail;
  useEffect(() => {
    if(!params.inspectionIdx || inspectionIdx) return;
    dispatch(fetchInspectionDetail(params.inspectionIdx));
  }, []);

  const isProgessPage = useMemo(() => params.page && !isNaN(params.page) && params.page > 0, [params.page]);

  return (
    
    <div id="header">
      <div className="container">
        <h1 className="logo white">
          <a className={classes.header} onClick={() => { history.push("/inspections") }}>
            옥타그노시스 검사
          </a>
        </h1>
        {(isProgessPage && inspectionIdx) &&
          <ProgressBar 
            inspectionName={inspectionName}
            totalPage={totalPage}
            page={params.page}
          />
        }
        <UserInfoTab/>
      </div>
    </div>
  )
}

export default Header;