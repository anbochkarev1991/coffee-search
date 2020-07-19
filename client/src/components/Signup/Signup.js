import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Signup.module.css';
import { signup } from '../../redux/actions/enter-actions';

export default function Singup() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.enter.userName);
  const history = useHistory();

  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({
    login: '',
    email: '',
    password: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        email,
        password,
      })
    });
    if (response.status === 200) {
      dispatch(signup(inputs))
      history.push('/');
    }
    setError('Ошибка регистрации');
  }

  function handleChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  const { login, email, password } = inputs;

  return (
    <>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <label htmlFor="login">Login:
          <input 
            name="login"
            type="text"
            placeholder="login"
            required 
            onChange={handleChange}
            value={login} />
          </label>
        <label htmlFor="email">Email:
        <input 
            name="email"
            type="email"
            placeholder="email"
            required 
            onChange={handleChange}
            value={email} />
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
        {/* <label htmlFor="birthday">Birthday:
        <input 
            name="birthday"
            type="date"
            required 
            onChange={handleChange}
            />
        </label> */}
        <button type="submit">Зарегистрироваться</button>
      </form>
    {user && <h3>Добро пожаловать, {user}!</h3>}
    {error}
    </>
  );
}
