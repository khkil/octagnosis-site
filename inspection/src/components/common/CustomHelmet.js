import React, { useMemo } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";

const CustomHelmet = ({ title }) => {

  const fullTitle = useMemo(() => `옥타그노시스 - ${title}`, [title]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{fullTitle}</title>
        </Helmet>
      </HelmetProvider>
    </>
  )
}

export default CustomHelmet;