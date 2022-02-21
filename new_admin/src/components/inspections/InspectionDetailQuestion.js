import { Box, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  question: {
    padding: 10,
    background: 'white',
    borderRadius: '40px',
    border: '1px solid #cccc',
  },
});

const InspectionDetailQuestion = ({ provided, questionIdx, questionNumber, questionText }) => {
  const classes = useStyles();
  return (
    <Box p={0.5}>
      <ListItem
        className={classes.question}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        {`${questionNumber}. ${questionText}`}
      </ListItem>
    </Box>
  );
};

export default InspectionDetailQuestion;
