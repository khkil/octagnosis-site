import React from 'react';
import footerLogo from '../../assets/images/common/logo_g.png';

const Footer = () => {

  return (
    <div id="footer" className="bg-navy">
        <div className="container">
            <img src={footerLogo} alt=""/>
            <div className="txt-wrap">
                <p className="copyright">Copyright 2004. 한국진로적성센터. All rights reserved.</p>
                <div className="company">
                    <p className="site">www.aptitude-x.com</p>
                    <p className="phone">02. 523. 7523</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;