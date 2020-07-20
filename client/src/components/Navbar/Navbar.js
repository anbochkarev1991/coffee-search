import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const user = useSelector((state) => state.enter.login);

  return (
    <>
      <NavLink to="/">Home</NavLink>
      {user && <NavLink to="/logout">Logout</NavLink>}
      {user && <NavLink to="/profile">Profile</NavLink>}
      {!user && <NavLink to="/login">Login</NavLink>}
      {!user && <NavLink to="/signup">Registration</NavLink>}
    </>
  );
}

export default Navbar;
