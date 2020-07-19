import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Registration</NavLink>
    </>
  );
}

export default Navbar;
