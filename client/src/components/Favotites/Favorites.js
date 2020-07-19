import React from 'react';
import { useSelector } from 'react-redux';

function Favorites() {
  const user = useSelector((state) => state.enter);
  const favs = user.favorites;

  return (
    <ul>{favs && favs.map((cafe) => <li key={cafe._id}>{cafe.name}</li>)}</ul>
  );
}

export default Favorites;
