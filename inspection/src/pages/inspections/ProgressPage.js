import React, { useCallback, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import QuestionForm from '../../components/questions/QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearQuestion, onePageQuestionRequest, ONE_PAGE_QUESTION_LIST_REQUEST } from '../../modules/question';
import Loader from '../../components/ui/Loader';


const ProgressPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const { inspectionIdx, page } = match.params;
  
  const { isLoading, questionList, totalPage } = useSelector(({ loading, question, inspection }) => ({
    isLoading: loading[ONE_PAGE_QUESTION_LIST_REQUEST],
    questionList: question.list,
    totalPage: inspection.selected.totalPage
  }));

  useEffect(() => {
    const params = {
      inspectionIdx: inspectionIdx,
      page: page
    }
    console.log("render");
    dispatch(onePageQuestionRequest(params));
    return () => {
      dispatch(clearQuestion());
    }
  }, [page]);

  if(isLoading) return <Loader/>;
  if(questionList.length === 0) return null;
  return (
    <Container>
      <QuestionForm 
        inspectionIdx={inspectionIdx}
        questionList={questionList}
        totalPage={totalPage}
      />
    </Container>
  )
}

export default ProgressPage;
