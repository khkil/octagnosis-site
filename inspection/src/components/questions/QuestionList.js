import React, { useEffect } from 'react';

const QuestionList = ({ inspectionIdx, page }) => {

  useEffect(() => {
    console.log(inspectionIdx, page);
  }, [page]);

  return (
    <div>
      
    </div>
  )
}

export default QuestionList;