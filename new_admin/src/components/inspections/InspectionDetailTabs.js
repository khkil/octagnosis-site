import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import { Paper, Tab, Tabs } from '@mui/material';

const CustomTab = withStyles({
  selected: {
    backgroundColor: 'black',
    transition: 'background-color 0.3s ease-in-out',
  },
})(Tab);

const InspectionDetailTabs = () => {
  const [tabValue, setTabValue] = useState('basic');

  const handleChange = (event, value) => {
    setTabValue(value);
  };
  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatiorColor="white"
        textColor="primary"
        aria-label="disabled tabs example"
      >
        <CustomTab label="기본정보" value="basic" />
        <CustomTab label="문항관리" value="question" />
      </Tabs>
    </Paper>
  );
};

export default InspectionDetailTabs;
