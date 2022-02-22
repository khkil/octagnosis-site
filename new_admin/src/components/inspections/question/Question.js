import React, { useCallback } from 'react';
import { Avatar, Box, IconButton, Link, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete, DragHandle, Folder } from '@mui/icons-material';

const useStyles = makeStyles({
  question: {
    background: 'white',
    borderRadius: '60px',
    border: '1px solid #cccc',
  },
});

const Question = ({ provided, questionIdx, questionNumber, questionText }) => {
  const classes = useStyles();

  const toggleDetailPopup = useCallback(
    e => {
      e.preventDefault();
      console.log(questionIdx);
    },
    [questionIdx],
  );
  return (
    <Box p={0.5}>
      <ListItem
        className={classes.question}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <Delete fontSize="medium" />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <DragHandle fontSize="medium" />
        </ListItemAvatar>
        <Link href="#" underline="hover" color={'rgb(25, 118, 210)'} onClick={toggleDetailPopup}>
          <Typography variant="subtitle1" component="div">{`${questionNumber}. ${questionText}`}</Typography>
        </Link>
      </ListItem>
    </Box>
  );
};

export default Question;
