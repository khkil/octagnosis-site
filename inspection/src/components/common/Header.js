import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import headerIcon from '../../assets/images/common/logo_octa.png';
import Progress from './Progress';
import Button from '@mui/material/Button';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';

const useStyles = makeStyles({
  header: {
    display: "block",
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    background: `url(${headerIcon})`
  },
  btns: {
    position: "relative",
    //left: "20%"
  },
  btn: {
    background : "white"
  }
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
    console.log("inspectionIdx", inspectionIdx);
    if(inspectionIdx){
      dispatch(fetchInspectionDetail(inspectionIdx));
    }
  }, []);

  return (
    
    <div id="header">
      <div className="container">
        <h1 className="logo white">
          <a className={classes.header} onClick={() => { history.push("/inspections") }}>
            옥타그노시스 검사
          </a>
        </h1>
        {inspectionIdx &&
          <Progress 
            inspectionIdx={inspectionIdx}
            inspectionName={inspectionName}
            questionCnt={questionCnt}
          />
        }
        <div className={classes.btns}>
          <Button variant="contained">로그인</Button>
          <Button variant="contained">회원가입</Button>
        </div>
      </div>
    </div>
  )
}

export default Header;