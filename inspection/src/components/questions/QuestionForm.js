import React, { useEffect } from 'react';
import { IMAGE_QUESTION, TEXT_QUESTION } from '../../constants/index';
import ImageQuestion from './ImageQuestion';
import TextQuestion from './TextQuestion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Box } from '@mui/material';

const QuestionForm = ({ questionList }) => {

  return (

    <Formik
        initialValues={{
          answer:""
        }}
        validationSchema={Yup.object().shape({
          answer: Yup.string().required("아이디를 입력하세요"),
        })}
        onSubmit={(data) => {
          alert(1);
          console.log("data", data);
        }}
      >
      {({ values, handleChange, touched, errors }) => (
        <Form>

          {/* {questionList.map(({ questionIdx, questionText, questionNumber, questionType, answers }) => (
            questionType === TEXT_QUESTION  ? 
              <TextQuestion 
                key={questionIdx} 
                questionIdx={questionIdx}
                questionNumber={questionNumber}
                questionText={questionText}
                answers={answers}
              /> : 
            questionType === IMAGE_QUESTION  ? 
              <ImageQuestion 
                key={questionIdx} 
                questionIdx={questionIdx}
                questionNumber={questionNumber}
                questionText={questionText}
                answers={answers}
              /> : null
            )
          )} */}

            <label>
              <Field 
                type="radio" 
                name="answer" 
                value="One" 
                error={Boolean(touched.answer && errors.answer)}
                errorText={touched.answer && errors.answer} 
              />
              One
            </label>
            <ErrorMessage name="answer" />
            <label>
              <Field 
                type="radio" 
                name="answer" 
                value="Two" 
                error={Boolean(touched.answer && errors.answer)}
                errorText={touched.answer && errors.answer} 
              />
              Two
            </label>
          <Box className="btn-wrap mt40">
            <button type="submit" className="btn yellow md">다음</button>
          </Box>
        </Form>

      )}

      </Formik>
    
  )
}

export default QuestionForm;