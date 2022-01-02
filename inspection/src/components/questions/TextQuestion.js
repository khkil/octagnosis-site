import React, { memo } from 'react';
import { Box } from '@mui/material';
import Answer from '../answers/Answer';

const TextQuestion = memo(({ questionText, answers }) => {
  return (
    <Box className="question">
      <p className="num">1</p>
      <div>
        <p className="txt-question">{questionText}</p>

        <div className="inp-wrap v1 mt10">
          {answers.map(({ answerIdx, answerText, answerScore, filePath }, index) => (
            <Answer
              key={answerIdx}
              answerIdx={answerIdx} 
              answerText={answerText}
              answerScore={answerScore} 
              filePath={filePath}
              index={index}
            />
          ))}
          
        
        </div>
      </div>
    </Box>
  )
});

export default TextQuestion;