import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import Answer from './Answer';

const AnswerList = ({ answers, questionForm, setQuestionForm }) => {
  return (
    <Box>
      {answers.map(({ answerIdx, answerText, answerScore, filePath }, index) => (
        <Answer
          index={index}
          answerIdx={answerIdx}
          answerText={answerText}
          answerScore={answerScore}
          filePath={filePath}
          questionForm={questionForm}
          setQuestionForm={setQuestionForm}
        />
      ))}
    </Box>
  );
};

export default AnswerList;
