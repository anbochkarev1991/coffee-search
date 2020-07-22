import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './List.module.css';

function List() {
  const list = useSelector((state) => state.coffee.list);

  return (
    <div className={styles.topRated}>
      <h3>Top rated</h3>
      {list &&
        list.map((cafe) => (
          <React.Fragment key={cafe._id}>
            <Link to={`/cafes/${cafe._id}/menu`}>
              <strong>{cafe.name}</strong>
            </Link>
            <p>
              Rating:{' '}
              {cafe.rating.length
                ? cafe.rating.reduce((acc, rate) => {
                    return acc + rate.value;
                  }, 0) / cafe.rating.length
                : 'Unrated'}
            </p>
          </React.Fragment>
        ))}
    </div>
  );
}

export default List;
