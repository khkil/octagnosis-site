import React, { useCallback, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import QuestionList from '../../components/questions/QuestionList';
import { useDispatch, useSelector } from 'react-redux';
import { onePageQuestionListRequest, ONE_PAGE_QUESTION_LIST_REQUEST } from '../../modules/question';
import Loader from '../../components/ui/Loader';

const ProgressPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const { inspectionIdx, page } = match.params;
  
  const { isLoading, questionList, totalPage } = useSelector(({ loading, question, inspection }) => ({
    isLoading: loading[ONE_PAGE_QUESTION_LIST_REQUEST],
    questionList: question.list,
    totalPage: inspection.selected.totalPage
  }));

  const goNextPage = useCallback(() => {
    const nextPage = Number(page) === totalPage ? "end" : Number(page) + 1;
    history.push(`/inspections/${inspectionIdx}/pages/${nextPage}`);
  });

  useEffect(() => {
    const params = {
      inspectionIdx: inspectionIdx,
      page: page
    }
    dispatch(onePageQuestionListRequest(params));
  }, [page]);

  if(isLoading) return <Loader/>;
  return (
    <Container maxWidth="xl">
      <QuestionList inspectionIdx={inspectionIdx} page={page}/>
      <Box className="btn-wrap mt40">
        <button className="btn yellow md" onClick={goNextPage}>다음</button>
      </Box>
    </Container>
  )
}

export default ProgressPage;
