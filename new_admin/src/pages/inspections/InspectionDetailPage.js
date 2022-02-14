import { Box, Paper } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import InspectionDetailTabs from '../../components/inspections/InspectionDetailTabs';
import MenuBar from '../../components/common/MenuBar';
import InspectionDetailInfo from '../../components/inspections/InspectionDetailInfo';
import InspectionDetailQuestions from '../../components/inspections/InspectionDetailQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import question, { fetchQuestionList, FETCH_QUESTION_LIST } from '../../modules/question';
import Loader from '../../components/ui/Loader';

const InspectionDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('basic');

  const { loading, inspectionDetail, questionList } = useSelector(({ loading, inspection, question }) => ({
    loading: {
      inspection: loading[FETCH_INPECTION_DETAIL] === undefined || Boolean(loading[FETCH_INPECTION_DETAIL]),
      question: loading[FETCH_QUESTION_LIST] === undefined || Boolean(loading[FETCH_QUESTION_LIST]),
    },
    inspectionDetail: inspection.selected,
    questionList: question.list,
  }));

  const inspectionIdx = useMemo(() => location.pathname.split('inspections/')[1], [location.pathname]);

  useEffect(() => {
    if (tabValue === 'basic') {
      dispatch(fetchInspectionDetail(inspectionIdx));
    } else if (tabValue === 'question') {
      dispatch(fetchQuestionList(inspectionIdx));
    }
  }, [tabValue]);

  console.log(loading);
  return (
    <Box>
      <MenuBar match={match} />
      <InspectionDetailTabs tabValue={tabValue} setTabValue={setTabValue} />

      {tabValue === 'basic' ? (
        loading.inspection ? (
          <Loader />
        ) : (
          <InspectionDetailInfo inspectionDetail={inspectionDetail} />
        )
      ) : tabValue === 'question' ? (
        loading.question ? (
          <Loader />
        ) : (
          <InspectionDetailQuestions
            questionList={questionList}
            fetchQuestionList={() => {
              dispatch(fetchQuestionList(inspectionIdx));
            }}
          />
        )
      ) : null}
    </Box>
  );
};

export default InspectionDetailPage;
