import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IMAGE_QUESTION, TEXT_QUESTION } from '../../constants/index';
import ImageQuestion from './ImageQuestion';
import TextQuestion from './TextQuestion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { insertMemberAnswer } from '../../api/answerApi';
import { useDispatch, useSelector } from 'react-redux';
import { goPage } from '../../utils/common';

const QuestionForm = ({ inspectionIdx, questionList, totalPage }) => {
  const { page } = useParams();
  const history = useHistory();

  const validationSchema = Yup.object().shape(
    questionList.reduce((result, { questionIdx }) => {
      result[`question_${questionIdx}`] = Yup.string().required('질문에 답해주세요.');
      return result;
    }, {}),
  );
  const inintialValues = questionList.reduce((result, { questionIdx }) => {
    result[`question_${questionIdx}`] = '';
    return result;
  }, {});

  const { memberIdx } = useSelector(({ auth }) => ({
    memberIdx: auth.member.idx,
  }));

  const handleSubmit = data => {
    const memberAnswers = Object.keys(data).map(key => ({
      memberIdx: memberIdx,
      questionIdx: key.replace('question_', ''),
      answerIdx: data[key],
    }));
    insertMemberAnswer(memberAnswers).then(() => {
      goPage(history, inspectionIdx, Number(page) + 1, totalPage);
    });
  };

  return (
    <Formik
      initialValues={inintialValues}
      validationSchema={validationSchema}
      onSubmit={data => {
        handleSubmit(data);
      }}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          {questionList.map(({ questionIdx, questionText, questionNumber, questionType, answers }) =>
            questionType === TEXT_QUESTION ? (
              <TextQuestion key={questionIdx} questionIdx={questionIdx} questionNumber={questionNumber} questionText={questionText} answers={answers} handleChange={handleChange} values={values} />
            ) : questionType === IMAGE_QUESTION ? (
              <ImageQuestion key={questionIdx} questionIdx={questionIdx} questionNumber={questionNumber} questionText={questionText} handleChange={handleChange} values={values} />
            ) : null,
          )}

          <Box className="btn-wrap mt40">
            <button type="submit" className="btn yellow md">
              다음
            </button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
