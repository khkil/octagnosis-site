import { Box, Paper } from '@mui/material';
import React from 'react';
import CustomizedTabs from '../../components/inspections/InspectionDetailTabs';
import MenuBar from '../../components/common/MenuBar';

const InspectionDetailPage = ({ match }) => {
  return (
    <Box>
      <MenuBar match={match} />
      <Paper>
        <CustomizedTabs />
      </Paper>
    </Box>
  );
};

export default InspectionDetailPage;
