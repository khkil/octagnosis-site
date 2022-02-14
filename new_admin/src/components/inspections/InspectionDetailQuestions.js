import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { fetchQuestionList } from '../../modules/question';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

const InspectionDetailQuestions = ({ questionList, fetchQuestionList }) => {
  const firstResultIdx = questionList[0].resultIdx;
  const classes = useStyles();
  const [value, setValue] = useState(firstResultIdx);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(questionList);
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
          {questionList.map(({ resultIdx, resultName }) => (
            <Tab key={resultIdx} label={resultName} value={resultIdx} />
          ))}
        </Tabs>

        {questionList.map(({ resultIdx, resultName }) => (
          <TabPanel key={resultIdx} value={value} index={resultIdx} test={1}>
            {resultIdx}
          </TabPanel>
        ))}
      </Box>
    </Paper>
  );
};

export default InspectionDetailQuestions;
