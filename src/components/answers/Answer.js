import { Field } from 'formik';
import React, { useCallback, useMemo } from 'react';

const Answer = ({ questionIdx, answerIdx, answerText, filePath, index, handleChange, values }) => {
  const key = useMemo(() => `question_${questionIdx}`, [questionIdx]);

  return (
    <div className="inp-item radio v1">
      <label className={values[key] == answerIdx ? 'selected' : ''}>
        <Field type="radio" name={key} value={answerIdx} onChange={handleChange} />
        <p className="num">{index + 1}</p>
        <p className="txt">{answerText}</p>
      </label>
    </div>
  );
};

export default Answer;
