import { Box, FormControlLabel, Radio } from '@mui/material';
import { Field } from 'formik';
import React, { useCallback, useMemo } from 'react';

const Answer = ({ questionIdx, answerIdx, answerText, filePath, index, handleChange, values }) => {
  const key = useMemo(() => `question_${questionIdx}`, [questionIdx]);

  return (
    <div className="inp-item radio v1">
      <FormControlLabel
        className={values[key] == answerIdx ? 'selected' : ''}
        name={key}
        value={answerIdx}
        onChange={handleChange}
        control={<Radio style={{ display: 'none' }} />}
        //label={`${index + 1}. ${answerText}`}
        label={
          <Box sx={{ display: 'flex' }}>
            <p className="num">{index + 1}</p>
            <p className="txt">{answerText}</p>
          </Box>
        }
      ></FormControlLabel>
    </div>
  );
};

export default Answer;
