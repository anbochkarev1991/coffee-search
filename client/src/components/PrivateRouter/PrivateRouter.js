import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRouter({children, ...rest}) {
  const user = useSelector((state) => state.enter.login);

  return <Route {...rest}>
  {
    user
    ? children
    : <Redirect to="/login" />
  }
  </Route>
}
