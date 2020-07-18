import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/enter-actions';

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetch('/api/logout');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      dispatch(logout());
      history.push('/');
    })();
  }, []);

  return (
    <>
      Logout
    </>
  );
}
