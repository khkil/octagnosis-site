import React, { useMemo } from 'react';

const PropensityResult = ({ results, rankCount }) => {
  const mainResultCount = useMemo(() => Math.round(rankCount / 2));
  return (
    <div className="report-content">
      <p className="tit v2">성향유형 진단 </p>
      {results.map(({ resultIdx, resultName, resultContents }, index) => (
        <div key={resultIdx}>
          <div className="tit-wrap mt40">
            <p className="tit v1">
              {index + 1 <= mainResultCount ? '주성향' : '부성향'}
              {index + 1 <= mainResultCount
                ? index + 1
                : index + 1 - mainResultCount}
            </p>
            <p className="tit v3">{resultName}</p>
          </div>
          <ul className="list-wrap v1">
            {resultContents.map(({ content }, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PropensityResult;
