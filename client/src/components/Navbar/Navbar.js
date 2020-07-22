import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.module.css';

function Navbar() {
  const user = useSelector((state) => state.enter.login);

  return (
    <>
      <nav className={"navbar navbar-expand-lg navbar-dark bg-light d-flex justify-content-between"}>
        <ul className={"nav nav-tabs"}>
         <NavLink exact to="/" className={"nav-item nav-link"}>Home</NavLink>
          {!user && <NavLink to="/login" className={"nav-item nav-link"}>Login</NavLink>}
          {user && <NavLink to="/logout" className={"nav-item nav-link"}>Logout</NavLink>}
          {user && <NavLink to="/profile" className={"nav-item nav-link"}>Profile</NavLink>}
          {!user && <NavLink to="/signup" className={"nav-item nav-link"}>Registration</NavLink>}
        </ul>
        <div className="d-flex justify-content-end">
          {user &&<h5> Добро пожаловать, {user}</h5>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
