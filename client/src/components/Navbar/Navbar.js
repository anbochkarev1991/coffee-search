import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function Navbar() {
  const user = useSelector((state) => state.enter.login);

  return (
    <>
      <nav
        className={
          'navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between'
        }
      >
        <ul className={'nav nav-tabs'}>
          <h3  className={styles.h3} exact to="/">
            Specialty Union
          </h3>
          {' '}
          <NavLink exact to="/" className={'nav-item nav-link'}>
            На главную
          </NavLink>
          {!user && (
            <NavLink to="/login" className={'nav-item nav-link'}>
              Войти
            </NavLink>
          )}
          {user && (
            <NavLink to="/logout" className={'nav-item nav-link'}>
              Выйти
            </NavLink>
          )}
          {user && (
            <NavLink to="/profile" className={'nav-item nav-link'}>
              Личный профиль
            </NavLink>
          )}
          {!user && (
            <NavLink to="/signup" className={'nav-item nav-link'}>
              Зарегистрироваться
            </NavLink>
          )}
        </ul>
        <div className="d-flex justify-content-end">
          {user && <h5> Добро пожаловать, {user}</h5>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
