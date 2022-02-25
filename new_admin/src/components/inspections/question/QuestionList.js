import React, { memo, useCallback, useState } from 'react';
import { Box, List, ListItem, Alert, AlertTitle, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Question from './Question';
import { Delete, RestartAlt, Save, Add } from '@mui/icons-material';
import { updateQuestionsApi } from '../../../api/questionApi';

const QuestionList = ({ inspectionIdx, resultIdx, resultName, initialQuestionList, fetchQuestionList }) => {
  const [questionList, setQuestionList] = useState(initialQuestionList);

  const updateQuestions = () => {
    if (!confirm('변경 사항을 저장하시겠습니까?')) return false;
    updateQuestionsApi(questionList).then(() => {
      fetchQuestionList();
    });
  };

  const addQuestion = () => {
    const [question] = questionList.filter((question, index) => index === questionList.length - 1);
    const dummyQuestion = Object.keys(question)
      .map(key => ({
        [key]:
          key === 'questionNumber'
            ? question[key] + 1
            : key === 'resultIdx'
            ? resultIdx
            : key === 'inspectionIdx'
            ? inspectionIdx
            : '',
      }))
      .reduce((a, b) => ({ ...a, ...b }));
    setQuestionList([...questionList, dummyQuestion]);
  };

  const resetItems = useCallback(() => {
    setQuestionList(initialQuestionList);
  }, [initialQuestionList]);

  const onDragEnd = ({ destination, source }) => {
    const items = [...questionList];
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    items.forEach((item, index) => {
      const newQuestionNumber = index + 1;
      item.questionNumber = newQuestionNumber;
    });
    setQuestionList(items);
  };

  return (
    <Box>
      <Alert severity="success">
        <AlertTitle>
          <Typography variant="h6">{resultName}</Typography>
        </AlertTitle>
      </Alert>
      <Box pt={1} pl={1}>
        <Button variant="contained" startIcon={<Add />} onClick={addQuestion}>
          문항추가
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {questionList.map(({ questionIdx, questionNumber, questionText }, index) => (
                <Draggable key={index} draggableId={`question_${index}`} index={index}>
                  {provided => (
                    <Question
                      provided={provided}
                      questionIdx={questionIdx}
                      questionNumber={questionNumber}
                      questionText={questionText}
                      setQuestionList={setQuestionList}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      {JSON.stringify(initialQuestionList) !== JSON.stringify(questionList) && (
        <Box
          pb={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<RestartAlt />}
            style={{ marginRight: 10 }}
            onClick={resetItems}
          >
            초기화
          </Button>
          <Button
            size="large"
            variant="contained"
            startIcon={<Save />}
            style={{ marginRight: 10 }}
            onClick={updateQuestions}
          >
            저장
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default QuestionList;
