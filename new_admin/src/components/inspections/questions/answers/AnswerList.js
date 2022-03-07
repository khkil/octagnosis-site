import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import Answer from './Answer';

const AnswerList = ({ answers, questionForm, setQuestionForm }) => {
  useEffect(() => {
    console.log('answers: ', answers);
  }, []);

  return (
    <Box>
      {answers.map(({ answerIdx, answerText, answerScore }, index) => (
        <Answer
          index={index}
          answerIdx={answerIdx}
          answerText={answerText}
          answerScore={answerScore}
          questionForm={questionForm}
          setQuestionForm={setQuestionForm}
        />
      ))}
    </Box>
  );
};

export default AnswerList;
