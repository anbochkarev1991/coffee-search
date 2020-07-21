import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.module.css';

function Navbar() {
  const user = useSelector((state) => state.enter.login);

  return (
    <>
      <nav className={"navbar navbar-expand-lg navbar-dark bg-light"}>
        <ul className={"nav nav-tabs"}>
         <NavLink exact to="/" className={"nav-item nav-link"}>Home</NavLink>
          {!user && <NavLink to="/login" className={"nav-item nav-link"}>Login</NavLink>}
          {user && <NavLink to="/logout" className={"nav-item nav-link"}>Logout</NavLink>}
          {user && <NavLink to="/profile" className={"nav-item nav-link"}>Profile</NavLink>}
          {!user && <NavLink to="/signup" className={"nav-item nav-link"}>Registration</NavLink>}
        </ul>
        <form className={"form-inline container"}>
          <input className={"form-control mr-sm-2 container"} type="search" placeholder="Search" aria-label="Search" />
          <button className={"btn btn-outline-success my-2 my-sm-0"} type="submit">Search</button>
        </form>
        {user &&<h5> Welcome, {user}</h5>}
      </nav>
    </>
  );
}

export default Navbar;
