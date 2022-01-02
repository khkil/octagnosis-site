import React from 'react';

const Answer = ({ answerIdx, answerText, answerScore, filePath, index }) => {

  return (
    <div className="inp-item radio v1">
        <input type="radio" name="answer" value=""/>
        <label>
            <p className="num">{index + 1}</p>
            <p className="txt">{answerText}</p>
            {/* <div className="img-wrap">
                <img src="../img/temp/@temp_radio01.png" alt=""/>
            </div> */}
        </label>
        
    </div>
  )
}

export default Answer;