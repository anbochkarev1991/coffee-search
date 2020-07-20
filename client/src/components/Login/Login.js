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

  const { login, password } = inputs;

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
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      setError(false);
      dispatch(loginFunc(result));
      return history.push('/');
    } else {
      setError('Неправильные логин или пароль');
    }
  }

  function handleChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={"form-group"}>
          <label htmlFor="login">
            Login:
            <input
              name="login"
              type="text"
              placeholder="login"
              required
              onChange={handleChange}
              value={login}
              className={"form-control"}
            />
          </label>
        </div>
        <div className={"form-group"}>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={handleChange}
              value={password}
              className={"form-control"}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mb-2">Войти</button>
      </form>
      {user && <h3>Добро пожаловать, {user}!</h3>}
      {error}
    </>
  );
}
