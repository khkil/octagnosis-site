import React, { useState } from 'react';
import { withStyles, makeStyles } from '@mui/styles';
import { Paper, Tab, Tabs, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
  indicator: {
    background: 'none',
  },
  tabs: {
    "& button[aria-selected='true']": {
      color: 'white',
      background: theme.palette.primary.main,
    },
  },
  tab: { border: 'solid 0.5px' },
}));

const InspectionDetailTabs = ({ tabValue, setTabValue }) => {
  const classes = useStyles();

  const handleChange = (event, value) => {
    setTabValue(value);
  };
  return (
    <Tabs
      className={classes.tabs}
      value={tabValue}
      onChange={handleChange}
      TabIndicatorProps={{ style: { background: 'bl' } }}
      textColor="primary"
      aria-label="disabled tabs example"
    >
      <Tab
        className={classes.tab}
        label={<Typography variant="subtitle1">상세정보</Typography>}
        value="basic"
      />
      <Tab
        className={classes.tab}
        label={<Typography variant="subtitle1">문항관리</Typography>}
        value="question"
      />
    </Tabs>
  );
};

export default InspectionDetailTabs;
