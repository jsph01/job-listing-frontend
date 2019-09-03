import React from 'react';
import { Redirect } from 'react-router-dom';

function LogoutPage(props) {
  props.handleLogout();
  return <Redirect to="/" />
}

export default LogoutPage;
