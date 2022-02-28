import React, { useCallback, useMemo } from 'react';
import { Box, IconButton, Link, ListItem, ListItemAvatar, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete, RestoreFromTrash, DragHandle } from '@mui/icons-material';

const useStyles = makeStyles({
  question: {
    background: 'white',
    borderRadius: '60px',
    border: '1px solid #cccc',
    marginBottom: 5,
    maxWidth: '99%',
  },
});

const Question = ({
  provided,
  questionIdx,
  questionNumber,
  questionText,
  delYn,
  showDeletedQuestions,
  deleteQuestion,
  restoreQuestion,
  index,
}) => {
  const classes = useStyles();

  const isDeletedQuestion = useMemo(() => delYn === 'Y', [delYn]);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;
      console.log(questionIdx, value);
    },
    [questionIdx],
  );

  const toggleDetailPopup = useCallback(
    e => {
      e.preventDefault();
      console.log(questionIdx);
    },
    [questionIdx],
  );

  return (
    <Box ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
      {!(!showDeletedQuestions && isDeletedQuestion) && (
        <ListItem
          className={classes.question}
          secondaryAction={
            questionIdx && (
              <IconButton edge="end" aria-label="delete">
                {!isDeletedQuestion ? (
                  <Delete
                    fontSize="medium"
                    color="error"
                    onClick={() => {
                      deleteQuestion(questionIdx, index);
                    }}
                  />
                ) : (
                  <RestoreFromTrash
                    fontSize="medium"
                    color="info"
                    onClick={() => {
                      restoreQuestion(questionIdx, index);
                    }}
                  />
                )}
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <DragHandle fontSize="medium" />
          </ListItemAvatar>
          {questionIdx ? (
            <Link href="#" underline="hover" color={'rgb(25, 118, 210)'} onClick={toggleDetailPopup}>
              <Typography variant="subtitle1" component="div">{`${questionNumber}. ${questionText}`}</Typography>
            </Link>
          ) : (
            <>
              {`${questionNumber}.`}
              <TextField variant="standard" sx={{ width: '60%', marginLeft: 1 }} onChange={handleChange}></TextField>
            </>
          )}
        </ListItem>
      )}
    </Box>
  );
};

export default Question;
