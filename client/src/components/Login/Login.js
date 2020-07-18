import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { loginFunc } from '../../redux/actions/enter-actions';

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.enter.userName);
  const history = useHistory();

  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({
    login: '',
    password: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      })
    });
    console.log(response.status);
    if (response.status === 200) {
      dispatch(loginFunc(inputs.login));
      console.log(inputs.login);
      setTimeout(() => {
        return history.push('/');
      }, 1000);
    }
    setError('Ошибка входа');
  }

  function handleChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const { login, password } = inputs;

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="login">Login:
          <input 
            name="login"
            type="text"
            placeholder="login"
            required 
            onChange={handleChange}
            value={login} />
          </label>
        <label htmlFor="password">Password:
        <input 
            name="password"
            type="password"
            placeholder="password"
            required 
            onChange={handleChange}
            value={password} />
        </label>
        <button type="submit">Войти</button>
      </form>
    {user && <h3>Добро пожаловать, {user}!</h3>}
    {error}
    </>
  );
}
