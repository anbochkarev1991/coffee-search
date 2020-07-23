import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    const result= await response.json();
    if (response.status === 200) {
      dispatch(signup(result))
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
      <form onSubmit={handleSubmit}>
        <div className={"form-group"}>
          <label htmlFor="login">Логин:
            <input 
              name="login"
              type="text"
              placeholder="Логин"
              required 
              onChange={handleChange}
              value={login}
              className={"form-control"}
             />
            </label>
          </div>
          <div className={"form-group"}>
            <label htmlFor="email">Email:
            <input 
                name="email"
                type="email"
                placeholder="email"
                required 
                onChange={handleChange}
                value={email}
                className={"form-control"} />
            </label>
          </div>
          <div className={"form-group"}>
            <label htmlFor="password">Пароль:
            <input 
                name="password"
                type="password"
                placeholder="Пароль"
                required 
                onChange={handleChange}
                value={password}
                className={"form-control"} />
            </label>
          </div>
        {/* <label htmlFor="birthday">Birthday:
        <input 
            name="birthday"
            type="date"
            required 
            onChange={handleChange}
            />
        </label> */}
        <button type="submit" className="btn btn-primary mb-2">Зарегистрироваться</button>
      </form>
    {user && <h3>Добро пожаловать, {user}!</h3>}
    {error}
    </>
  );
}
