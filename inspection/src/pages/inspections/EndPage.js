import React, { useEffect } from 'react';

const EndPage = ({ progressDetail}) => {

  useEffect(() => {
    console.log(progressDetail);
  }, [])
  return(
    <div>
      end page
    </div>
  )
}

export default EndPage;