import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import HorizonalTabs from '../../components/inspections/HorizonalTabs';
import MenuBar from '../../components/common/MenuBar';
import InspectionDetailInfo from '../../components/inspections/InspectionDetailInfo';
import ResultsWithQuestions from '../../components/inspections/questions/ResultsWithQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInspectionDetail, FETCH_INPECTION_DETAIL } from '../../modules/inspection';
import question, { clearQuestion, fetchQuestionList, FETCH_QUESTION_LIST } from '../../modules/question';
import Loader from '../../components/ui/Loader';
import { useParams } from 'react-router-dom';
import { fetchResultList, FETCH_RESULT_LIST, LOADING_RESULT } from '../../modules/result';
import ResultList from '../../components/inspections/results/ResultList';

const tabData = [
  {
    text: '상세정보',
    value: 'basic',
  },
  {
    text: '문항관리',
    value: 'question',
  },
  {
    text: '결과관리',
    value: 'result',
  },
];

const InspectionDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const { inspectionIdx } = useParams();
  const [tabValue, setTabValue] = useState(tabData[1].value);

  const { loading, inspectionDetail, resultsWithQuestions, resultList } = useSelector(
    ({ loading, inspection, question, result }) => ({
      loading: {
        inspection: loading[FETCH_INPECTION_DETAIL] === undefined || Boolean(loading[FETCH_INPECTION_DETAIL]),
        question: loading[FETCH_QUESTION_LIST] === undefined || Boolean(loading[FETCH_QUESTION_LIST]),
        result: loading[LOADING_RESULT] === undefined || Boolean(loading[LOADING_RESULT]),
      },
      inspectionDetail: inspection.selected,
      resultsWithQuestions: question.list,
      resultList: result.list,
    }),
  );

  useEffect(() => {
    if (tabValue === 'basic') {
      dispatch(fetchInspectionDetail(inspectionIdx));
    } else if (tabValue === 'question') {
      dispatch(fetchQuestionList(inspectionIdx));
    } else if (tabValue === 'result') {
      dispatch(fetchResultList(inspectionIdx));
    }
  }, [inspectionIdx, tabValue]);

  return (
    <Container maxWidth={'xl'}>
      <MenuBar match={match} thirdText={inspectionDetail.inspectionName} />
      <HorizonalTabs tabData={tabData} tabValue={tabValue} setTabValue={setTabValue} />
      <Paper>
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
            <ResultsWithQuestions
              inspectionIdx={Number(inspectionIdx)}
              resultsWithQuestions={resultsWithQuestions}
              fetchQuestionList={() => {
                dispatch(fetchQuestionList(inspectionIdx));
              }}
            />
          )
        ) : tabValue === 'result' ? (
          loading.result ? (
            <Loader />
          ) : (
            <ResultList
              resultList={resultList}
              initData={() => {
                dispatch(fetchResultList(inspectionIdx));
              }}
            />
          )
        ) : null}
      </Paper>
    </Container>
  );
};

export default InspectionDetailPage;
