import React from 'react';
import bgImage1 from '../../assets/images/main/test1-bg.png';
import bgImage2 from '../../assets/images/main/test2-bg.png';
import { useHistory } from 'react-router-dom';

const MainPageContents = ({ inspectionList }) => {
  const history = useHistory();

  const startInspection = inspectionIdx => {
    const isReady = inspectionIdx && inspectionList.find(inspection => inspection.inspectionIdx == inspectionIdx);
    if (!isReady) {
      alert('준비중 입니다.');
      return false;
    }
    const link = `/inspections/${inspectionIdx}/pages/start`;
    history.push(link);
  };

  return (
    <>
      <section className="main main-title">
        <div className="inner">
          <p className="ft-ink txt1">
            ‘<span className="ft-ink">진짜 나</span>’를 찾아주는
          </p>
          <p className="txt2">옥타그노시스 검사</p>
          <p className="ft-ink txt1">
            ‘<span className="ft-ink">나답게</span>’ 살아갈 인생설계도를 <br className="mob" />
            제시합니다!
          </p>
          <p className="txt3">
            해외의 진로적성검사를 짜깁기 한 <br className="mob" />
            검사가 아닙니다. <br className="pc" />
            교육과학적 문항을 <br className="mob" />
            기반으로 특허받은 진로적성검사입니다.
          </p>
        </div>
      </section>
      <section className="wrap main-test">
        <div className="inner">
          <ul className="test-list">
            <li className="test-list1">
              <div className="test-wrap test-wrap1 center">
                <div>
                  <p className="ft-jalnan txt1">성향검사</p>
                  <p className="txt2">tendency examination</p>
                </div>
                <ul className="test-con">
                  <li>
                    <img src={bgImage1} alt="성향검사" />
                  </li>
                  <li>
                    <p>·주성향진단</p>
                    <p>·세부성향진단</p>
                    <p>·성향 적합 직업 및 학과 분석</p>
                  </li>
                </ul>
                <a
                  className="test-btn ft-jalnan"
                  onClick={() => {
                    startInspection(4);
                  }}
                >
                  START
                </a>
              </div>
            </li>
            <li className="test-list2">
              <div className="test-wrap center">
                <img src={bgImage2} alt="한국진로적성센터" />
                <div>
                  <p className="ft-jalnan txt1">사고력검사</p>
                  <p className="txt2">thinking skills examination</p>
                </div>
                <ul className="test-con">
                  <li>
                    <p>·주성향진단</p>
                    <p>·세부성향진단</p>
                    <p>·선호성향진단</p>
                    <p>·적합직무진단</p>
                    <p>·8가지 사고력 진단</p>
                    <p>·60가지 역량 진단</p>
                  </li>
                  <li>
                    <p>·성향적합 학습법</p>
                    <p>·성향적합 교육기관선택법</p>
                    <p>·성향적합 직업 및 학과분석</p>
                    <p>·선호적합 직업 및 학과분석</p>
                    <p>·교과목적성 분석</p>
                  </li>
                </ul>
                <a
                  className="test-btn ft-jalnan"
                  onClick={() => {
                    startInspection();
                  }}
                >
                  START
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default MainPageContents;
