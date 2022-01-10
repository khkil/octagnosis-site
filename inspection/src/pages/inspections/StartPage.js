import React from 'react';
import { Container, Box } from '@mui/material';
import footerLogo from '../../assets/images/common/headline.png';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const StartPage = () => {

  const { username } = useSelector(({ auth }) => ({
    username: auth.member.name
  }));

  const history = useHistory();
  const { inspectionIdx } = useParams();

  const startInspection = () => {
    history.push({
      pathname: `/inspections/${inspectionIdx}/pages/1`,
      state: 0
    });
  }
  
  return (
    <Container maxWidth="xl">
      <Box className="start-wrap">
        <p className="txt1">
          교육전문가들이 선택한 <br/>
          <span className="txt-red">세계 5대검사</span>
          <span>중 유일한 한국연구개발검사</span>
        </p>
        <img src={footerLogo} alt="" className="mt25"/>
        <p className="txt2">
          <span>옥타그노시스 (OGS 옥스) 검사를 받으시는 </span><br/>
          <span>{username}님 환영합니다.</span>
        </p>
        <Box className="bx">
          <p className="txt1">
              <span>평소의 나라면 어떨지 생각하시고, </span><br/>
              <span className="txt-blue">가장 먼저 떠오르는 생각으로</span><br/> 
              <span>답변해주시기 바랍니다.</span>
          </p>
          <p className="txt1 mt20">
            <span>정확한 결과를 위해 </span><br/>
              <span>모든 문항에 <span className="txt-blue">성의있고, 솔직하게</span></span> <br/>
              <span> 답변해 주시면 감사하겠습니다. </span> 
          </p>
          <Box className="btn-wrap mt40">
            <button className="btn lg blue" onClick={startInspection}>검사 시작하기</button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default StartPage;