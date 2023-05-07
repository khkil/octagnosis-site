import React, { memo } from 'react';
import { Box } from '@mui/material';
import Answer from '../answers/Answer';
import { ErrorMessage } from 'formik';

const TextQuestion = memo(({ questionIdx, questionNumber, questionText, answers, handleChange, values }) => {
  return (
    <Box className="question">
      <p className="num">{questionNumber}</p>
      <div>
        <p className="txt-question">
          {questionText}
          <ErrorMessage component="strong" name={`question_${questionIdx}`} style={{ marginLeft: '20px', fontSize: 13, color: 'red' }} />
        </p>
        <div className="inp-wrap v1 mt10">
          {answers.map(({ answerIdx, answerText, filePath }, index) => (
            <Answer key={answerIdx} questionIdx={questionIdx} answerIdx={answerIdx} answerText={answerText} filePath={filePath} index={index} handleChange={handleChange} values={values} />
          ))}
        </div>
        <div></div>
      </div>
    </Box>
  );
});

export default TextQuestion;
