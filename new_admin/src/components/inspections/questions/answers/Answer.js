import { Delete, Remove } from '@mui/icons-material';
import { Alert, Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

const Answer = ({ index, answerIdx, answerText, answerScore, questionForm, setQuestionForm }) => {
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    const { answers } = questionForm;
    const index = answers.findIndex(answer => answer.answerIdx === answerIdx);
    let answer = answers[index];
    answer = { ...answer, [name]: value };
    answers.splice(index, 1, answer);
    setQuestionForm({ ...questionForm, answers: answers });
  });

  return (
    <>
      <Alert variant="info">답변 {index + 1}</Alert>
      <Paper sx={{ mb: 1 }} variant="outlined">
        <Box sx={{ p: 1 }}>
          <TextField
            name="answerText"
            size="small"
            label="답변명"
            value={answerText}
            onChange={onChange}
            sx={{ width: '80%', mr: 1 }}
          ></TextField>
          <TextField
            name="answerScore"
            type="number"
            size="small"
            label="배점"
            value={answerScore}
            onChange={onChange}
            sx={{ width: '10%', mr: 1 }}
          ></TextField>

          <IconButton sx={{ float: 'right' }}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default Answer;
