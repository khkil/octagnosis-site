import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import headlineLogo from '../../assets/images/common/headline.png';

const EndPage = ({ history, match }) => {
  const { inspectionIdx, memberName } = useSelector(({ inspection, auth }) => ({
    inspectionIdx: inspection.selected.inspectionIdx,
    memberName: auth.member.name,
  }));

  const goResultPage = () => {
    history.push(`/inspections/${inspectionIdx}/pages/result`);
  };

  return (
    <Container>
      <div className="finish-wrap">
        <p className="txt1">
          교육전문가들이 선택한 <br />
          <span className="txt-red">세계 5대검사</span>중 유일한
          한국연구개발검사
        </p>
        <img src={headlineLogo} />
        <p className="txt2">
          <strong>{memberName}님</strong>
          <br />
          옥타그노시스 (OGS 옥스) 검사를 완료하셨습니다. <br />
          축하드립니다.
        </p>
        <p className="txt2 mt30">
          000님의 앞날에 항상 기쁜 일들만 가득하기를 기원합니다. <br />
          감사합니다.
        </p>
        <div className="bx">
          <p className="txt3">
            옥타그노시스 (OGS 옥스) 검사와 관련하여 궁금하신 사항은
            <strong className="phone">한국진로적성센터 02-523-7523</strong>
            으로 문의하시기 바랍니다.
          </p>
          <Box className="btn-wrap mt20">
            <button className="btn lg blue" onClick={goResultPage}>
              결과 보러가기
            </button>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default EndPage;
