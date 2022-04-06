import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import QuestionList from './QuestionList';

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
  tab: {
    border: '1px solid rgb(224, 227, 231) !important',
  },
}));

const ResultList = ({ inspectionIdx, resultList, fetchQuestionList }) => {
  const classes = useStyles({});
  const firstResultIdx = useMemo(() => (resultList.length > 0 ? resultList[0].resultIdx : -1), [resultList]);
  const [value, setValue] = useState(firstResultIdx);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (firstResultIdx === -1) return null;
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
            <Tab className={classes.tab} key={resultIdx} label={resultName} value={resultIdx} />
          ))}
        </Tabs>

        {resultList.map(({ resultIdx, resultName, questionList }) => (
          <TabPanel key={resultIdx} value={value} index={resultIdx}>
            <QuestionList
              inspectionIdx={inspectionIdx}
              resultIdx={resultIdx}
              resultName={resultName}
              initialQuestionList={questionList}
              fetchQuestionList={fetchQuestionList}
            />
          </TabPanel>
        ))}
      </Box>
    </Paper>
  );
};

export default ResultList;
