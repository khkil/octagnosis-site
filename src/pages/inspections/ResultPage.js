import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import '../../assets/styles/result/reset.css';
import '../../assets/styles/result/style.css';
import '../../assets/styles/result/utility.css';
import ResultList from '../../components/inspections/results/ResultList';
import { useSelector } from 'react-redux';
import { memberRankApi } from '../../api/rankApi';

const ResultPage = ({ match }) => {
  const [results, setResults] = useState([]);
  const { member, rankCount, inspectionName } = useSelector(({ auth, inspection }) => ({
    member: auth.member,
    rankCount: inspection.selected.rankCount,
    inspectionName: inspection.selected.inspectionName,
  }));

  useEffect(() => {
    const { inspectionIdx } = match.params;
    memberRankApi(inspectionIdx)
      .then(data => {
        setResults(data);
      })
      .catch(e => {
        alert('server error');
        console.error(e);
      });
  }, []);

  return (
    <Container className="report">
      <div className="report-header">
        <img src="/public/images/logo01.png" alt="" className="logo01" />
        <img src="/public/images/logo02.png" alt="" className="logo02" />
      </div>
      <div className="inner">
        <div className="report-title">
          <p className="name">
            <strong>{member.name}</strong>님
          </p>
          <p className="txt">
            옥타그노시스 이론에 기반한 옥스(OGS)검사 결과 분석자료입니다. <br />
            옥스(OGS)검사와 함께 멋진 인생이 설계되기를 바라며, 행복한 미래를 응원합니다.
          </p>
        </div>
        <ResultList inspectionName={inspectionName && inspectionName.replaceAll('검사', '').trim()} rankCount={rankCount} results={results} member={member} />
      </div>
      <div className="report-footer">
        <p className="warning">본 자료의 저작권은 한국진로적성센터에 있으므로, 무단전재, 복제, 복사, 유포 등은 법으로 금지되어 있습니다.</p>
        <p className="copyright">Copyright 2004. 한국진로적성센터. All rights reserved.</p>
      </div>
    </Container>
  );
};

export default ResultPage;
