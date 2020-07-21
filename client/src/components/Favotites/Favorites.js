import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';

function Favorites() {
  const user = useSelector((state) => state.enter);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${user._id}/favs`);
      const json = await response.json();
      setFavs(json.favs);
    })();
  }, [setFavs]);

  return (
    <div className={styles.favsList}>
      <ul>
        {favs &&
          favs.map((cafe) => (
            <li key={cafe._id}>
              <Link to={`/cafes/${cafe._id}`}>{cafe.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Favorites;
