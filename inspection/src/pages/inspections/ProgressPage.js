import React, { useCallback, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import QuestionForm from '../../components/questions/QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearQuestion, onePageQuestionRequest, ONE_PAGE_QUESTION_LIST_REQUEST } from '../../modules/question';
import Loader from '../../components/ui/Loader';


const ProgressPage = ({ match, location, history }) => {

  const dispatch = useDispatch();
  const { inspectionIdx, page } = match.params;
  
  const { isLoading, questionList, totalPage } = useSelector(({ loading, question, inspection }) => ({
    isLoading: loading[ONE_PAGE_QUESTION_LIST_REQUEST],
    questionList: question.list,
    totalPage: inspection.selected.totalPage
  }));

  useEffect(() => {

    const { state } = location;
    if(isNaN(page) || Number(page) - 1 !== state ){
      history.push(`/inspections/${inspectionIdx}/pages/start`);
    }
    
    const params = {
      inspectionIdx: inspectionIdx,
      page: page
    }
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
