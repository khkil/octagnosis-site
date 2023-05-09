import React from 'react';
import { Box } from '@mui/material';

const ImageQuestion = ({ questionText }) => {
  return (
    <Box spacing={3}>
      <div className="question">
        <p className="num">1</p>
        <p className="txt-question">{questionText}</p>
        <div className="img-content mt20">
          <div className="img-wrap">{/* 이미지 */}</div>
        </div>
      </div>
      <div className="inp-wrap v2 mt20">
        <div className="inp-item radio v1">
          <input type="radio" name="" id="" checked="" />
          <label for="">
            <p className="num">1</p>
            <p className="txt">한 단어로 요약하려고 한다.</p>
          </label>
        </div>
      </div>
    </Box>
  );
};

export default ImageQuestion;
