import React, { useCallback, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import QuestionForm from '../../components/questions/QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { onePageQuestionFormRequest, ONE_PAGE_QUESTION_LIST_REQUEST } from '../../modules/question';
import Loader from '../../components/ui/Loader';


const ProgressPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const { inspectionIdx, page } = match.params;
  
  const { isLoading, questionList, totalPage } = useSelector(({ loading, question, inspection }) => ({
    isLoading: loading[ONE_PAGE_QUESTION_LIST_REQUEST],
    questionList: question.list,
    totalPage: inspection.selected.totalPage
  }));

  const goNextPage = () => {
    const nextPage = Number(page) === totalPage ? "end" : Number(page) + 1;
    history.push(`/inspections/${inspectionIdx}/pages/${nextPage}`);
  };

  useEffect(() => {
    const params = {
      inspectionIdx: inspectionIdx,
      page: page
    }
    dispatch(onePageQuestionFormRequest(params));
  }, [page]);

  return (
    <Container>

      <QuestionForm questionList={questionList}/>


    </Container>
  )
}

export default ProgressPage;
