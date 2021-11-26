import React from 'react';
import DaumPostcode from 'react-daum-postcode';


const FindAddress = () => {

  return (
    <DaumPostcode 
      onComplete={ (data) => { alert(data)}}
    />
  )
  
}

export default FindAddress;

