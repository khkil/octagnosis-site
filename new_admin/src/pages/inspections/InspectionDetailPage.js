import { Box, Paper } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import InspectionDetailTabs from '../../components/inspections/InspectionDetailTabs';
import MenuBar from '../../components/common/MenuBar';
import InspectionDetailInfo from '../../components/inspections/InspectionDetailInfo';
import ResultList from '../../components/inspections/question/ResultList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import question, { fetchQuestionList, FETCH_QUESTION_LIST } from '../../modules/question';
import Loader from '../../components/ui/Loader';

const InspectionDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('question');

  const { loading, inspectionDetail, resultList } = useSelector(({ loading, inspection, question }) => ({
    loading: {
      inspection: loading[FETCH_INPECTION_DETAIL] === undefined || Boolean(loading[FETCH_INPECTION_DETAIL]),
      question: loading[FETCH_QUESTION_LIST] === undefined || Boolean(loading[FETCH_QUESTION_LIST]),
    },
    inspectionDetail: inspection.selected,
    resultList: question.list,
  }));

  const inspectionIdx = useMemo(() => location.pathname.split('inspections/')[1], [location.pathname]);

  useEffect(() => {
    if (tabValue === 'basic') {
      dispatch(fetchInspectionDetail(inspectionIdx));
    } else if (tabValue === 'question') {
      dispatch(fetchQuestionList(inspectionIdx));
    }
  }, [tabValue]);

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
          <ResultList
            resultList={resultList}
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
