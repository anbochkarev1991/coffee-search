import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSignup } from '../../redux/actions/enter-actions';

export default function Singup() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.enter.userName);

  const [inputs, setInputs] = useState({
    login: '',
    email: '',
    password: '',
    birthday: '',
  });

  useEffect(() => {
    dispatch(callSignup({
      login: 'jwfegigwd',
      email: 'nfwgeg',
      password: 'lmdkjd',
      birthday: 'kjfbibe',
    }));
  }, [dispatch])

  return (
    <form>
      <label htmlFor="login"><input name="login" type="text" placeholder="login" /></label>
      <label><input /></label>
      <label><input /></label>
      <label><input /></label>
    </form>
  );
}
