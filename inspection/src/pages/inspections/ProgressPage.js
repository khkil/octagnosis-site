import React from 'react';
import { Container, Box } from '@mui/material';
import QuestionList from '../../components/questions/QuestionList';

const ProgressPage = ({ match }) => {
  const { inspectionIdx, page } = match.params;
  return (
    <Container maxWidth="xl">

      <QuestionList inspectionIdx={inspectionIdx} page={page}/>
    </Container>
  )
}

export default ProgressPage;