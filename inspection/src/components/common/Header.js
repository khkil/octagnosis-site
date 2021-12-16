import React from 'react';
const Header = () => {

  return (
    <div id="header">
        <div className="container">
            <h1 className="logo white"><a>옥타그노시스 검사</a></h1>
            <div className="timer">
                <p className="txt-time">16</p>
                <p className="txt-gray">/30</p>
            </div>
            <div className="progress">
                <p className="txt">검사명검사명검사명</p>
                <div className="bar-wrap">
                    <div className="bar" style={{marginLeft: "45%"}}></div>
                    <p className="value" style={{marginLeft: "45%"}}>45%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header;