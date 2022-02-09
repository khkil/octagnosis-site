import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InspectionDetailTabs from '../../components/inspections/InspectionDetailTabs';
import MenuBar from '../../components/common/MenuBar';
import InspectionDetailInfo from '../../components/inspections/InspectionDetailInfo';
import InspectionDetailQuestions from '../../components/inspections/InspectionDetailQuestions';
import { useParams } from 'react-router-dom';

const InspectionDetailPage = ({ match }) => {
  const [tabValue, setTabValue] = useState('basic');
  useEffect(() => {}, [tabValue]);
  return (
    <Box>
      <MenuBar match={match} />
      <InspectionDetailTabs tabValue={tabValue} setTabValue={setTabValue} />
      <Paper>
        {tabValue === 'basic' ? (
          <InspectionDetailInfo />
        ) : tabValue === 'question' ? (
          <InspectionDetailQuestions />
        ) : null}
      </Paper>
    </Box>
  );
};

export default InspectionDetailPage;
