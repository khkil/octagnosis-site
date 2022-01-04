import React, { memo } from 'react';
import { Box } from '@mui/material';
import Answer from '../answers/Answer';
import { ErrorMessage } from 'formik';

const TextQuestion = memo(({ questionIdx, questionText, answers, handleChange, values }) => {
  return (
    <Box className="question">
      <p className="num">1</p>
      <div>
        <p className="txt-question">{questionText}</p>
        <div className="inp-wrap v1 mt10">
          {answers.map(({ answerIdx, answerText, filePath }, index) => (
            <Answer
              key={answerIdx}
              questionIdx={questionIdx}
              answerIdx={answerIdx} 
              answerText={answerText}
              filePath={filePath}
              index={index}
              handleChange={handleChange}
              values={values}
            />
          ))}
        </div>
      </div>
      <ErrorMessage component="strong" name={`question_${questionIdx}`} style={{fontSize: 13, color: "red"}} />
    </Box>
  )
});

export default TextQuestion;