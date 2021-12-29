import React, { useEffect } from 'react';
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
  const { inspectionIdx } = params;

  const dispatch = useDispatch();
  const { isLoading, inspectionDetail } = useSelector(({ loading, inspection }) => ({
    isLoading: loading[FETCH_INPECTION_DETAIL],
    inspectionDetail: inspection.selected
  }));

  const { inspectionName, questionCnt } = inspectionDetail;
  useEffect(() => {
    if(!inspectionIdx) return;
    dispatch(fetchInspectionDetail(inspectionIdx));
  }, [inspectionIdx]);

  return (
    
    <div id="header">
      <div className="container">
        <h1 className="logo white">
          <a className={classes.header} onClick={() => { history.push("/inspections") }}>
            옥타그노시스 검사
          </a>
        </h1>
        {inspectionIdx &&
          <ProgressBar 
            inspectionIdx={inspectionIdx}
            inspectionName={inspectionName}
            questionCnt={questionCnt}
          />
        }
        <UserInfoTab/>
      </div>
    </div>
  )
}

export default Header;