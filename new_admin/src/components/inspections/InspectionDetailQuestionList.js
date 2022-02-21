import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Paper, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import InspectionDetailQuestion from './InspectionDetailQuestion';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ pl: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  tabs: {
    "& button[aria-selected='true']": {
      color: 'white',
      background: theme.palette.primary.main,
    },
  },
}));

const InspectionDetailQuestionList = ({ resultList, fetchQuestionList }) => {
  const firstResultIdx = resultList[0].resultIdx;
  const classes = useStyles();
  const [value, setValue] = useState(firstResultIdx);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDragEnd = () => {};

  useEffect(() => {
    console.log('test : ', resultList);
  }, []);

  return (
    <Paper>
      <Box mt={2} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          className={classes.tabs}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {resultList.map(({ resultIdx, resultName }) => (
            <Tab key={resultIdx} label={resultName} value={resultIdx} />
          ))}
        </Tabs>

        {resultList.map(({ resultIdx, resultName, questionList }) => (
          <TabPanel key={resultIdx} value={value} index={resultIdx}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {provided => (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {questionList.map(({ questionIdx, questionNumber, questionText }, index) => (
                      <Draggable key={questionIdx} draggableId={`question_${questionIdx}`} index={index}>
                        {provided => (
                          <InspectionDetailQuestion
                            provided={provided}
                            questionIdx={questionIdx}
                            questionNumber={questionNumber}
                            questionText={questionText}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </TabPanel>
        ))}
      </Box>
    </Paper>
  );
};

export default InspectionDetailQuestionList;
