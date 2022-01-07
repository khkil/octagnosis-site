import React from 'react';
import { useHistory } from 'react-router-dom';


export const goLoginPage = () => {
  window.location.href = "/auth/login"
}