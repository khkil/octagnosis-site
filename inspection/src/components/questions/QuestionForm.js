import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IMAGE_QUESTION, TEXT_QUESTION } from '../../constants/index';
import ImageQuestion from './ImageQuestion';
import TextQuestion from './TextQuestion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Box } from '@mui/material';
import { insertMemberAnswer } from '../../api/answerApi';
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, startLoading } from '../../modules/loading';
import { ONE_PAGE_QUESTION_LIST_REQUEST } from '../../modules/question';

const QuestionForm = ({ inspectionIdx, questionList, totalPage }) => {

  const { page } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const validationSchema = Yup.object().shape(questionList.reduce((result, { questionIdx }) => {
    result[`question_${questionIdx}`] = Yup.string().required("문항을 선택해주세요")
    return result;
  }, {}));
  const inintialValues = questionList.reduce((result, { questionIdx }) => {
    result[`question_${questionIdx}`] = ""
    return result;
  }, {});


  const { memberIdx } = useSelector(({ auth }) => ({
    memberIdx: auth.member.idx,
  }));

  const goNextPage = () => {
    const nextPage = Number(page) === totalPage ? "end" : Number(page) + 1;
    history.push(`/inspections/${inspectionIdx}/pages/${nextPage}`);
  };

  const handleSubmit = (data) => {
    dispatch(startLoading(ONE_PAGE_QUESTION_LIST_REQUEST));
    insertMemberAnswer({
      answerMap: data,
      memberIdx: memberIdx
    })
    .then(() => {
      dispatch(endLoading(ONE_PAGE_QUESTION_LIST_REQUEST));
      goNextPage();
    });
  }

  return (
    
    <Formik
      initialValues={inintialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        handleSubmit(data);
      }}
    >
    {({ values, handleChange, touched, errors }) => (
      <Form>
        {questionList.map(({ 
          questionIdx, 
          questionText, 
          questionNumber, 
          questionType, 
          answers 
        }) => (
          questionType === TEXT_QUESTION  ? 
            <TextQuestion 
              key={questionIdx} 
              questionIdx={questionIdx}
              questionNumber={questionNumber}
              questionText={questionText}
              answers={answers}
              handleChange={handleChange}
              values={values}
            /> : 
          questionType === IMAGE_QUESTION  ? 
            <ImageQuestion 
              key={questionIdx} 
              questionIdx={questionIdx}
              questionNumber={questionNumber}
              questionText={questionText}
              handleChange={handleChange}
              values={values}
            /> : null
          )
        )} 
      
        <Box className="btn-wrap mt40">
          <button type="submit" className="btn yellow md">다음</button>
        </Box>
        {JSON.stringify(values)}
      </Form>

    )}

    </Formik>
    
  )
}

export default QuestionForm;