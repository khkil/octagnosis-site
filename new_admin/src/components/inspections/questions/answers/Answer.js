import { Delete } from '@mui/icons-material';
import { Alert, Box, IconButton, Paper, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { fileUploadApi } from '../../../../api/fileApi';
import { TYPE_IMAGE } from '../../../../constants';
import FileUploadDropzone from '../../../common/FileUploadDropzone';

const Answer = ({ index, answerIdx, answerText, answerScore, filePath, questionForm, setQuestionForm }) => {
  const { answers, answerType } = questionForm;

  const setAnswer = (key, value) => {
    const index = answers.findIndex(answer => answer.answerIdx === answerIdx);
    let answer = answers[index];
    answer = { ...answer, [key]: value };
    answers.splice(index, 1, answer);
    setQuestionForm({ ...questionForm, answers: answers });
  };

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setAnswer(name, value);
  });

  const uploadFiles = files => {
    const directory = '성향검사/답변/';
    const maxFiles = 1;
    if (files.length > maxFiles) {
      alert(`${maxFiles}개 이하 파일만 업로드 가능 합니다.`);
      return;
    }
    fileUploadApi(directory, files)
      .then(({ success }) => {
        alert(success);
        if (success) {
          const uploadedFiles = files.map(({ path }) => ({
            name: path,
            path: directory + path,
          }));
          setAnswer('filePath', uploadedFiles);
        } else {
          alert('업로드에 실패 하였습니다');
        }
      })
      .catch(e => {
        alert('server error');
        console.error(e);
      });
  };

  return (
    <>
      <Alert variant="info">답변 {index + 1}</Alert>
      {answerType === TYPE_IMAGE && <FileUploadDropzone filePath={filePath} onDrop={uploadFiles} />}

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
