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
      {favs &&
        favs.map((cafe) => (
          <Link
            key={cafe._id}
            to={`/cafes/${cafe._id}`}
            className={styles.link}
          >
            {cafe.name}
          </Link>
        ))}
    </div>
  );
}

export default Favorites;
