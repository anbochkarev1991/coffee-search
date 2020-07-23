import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './List.module.css';

function List() {
  let list = useSelector((state) => state.coffee.list);

  function averageRating(element) {
    return (
      element.rating.reduce((acc, rate) => {
        return acc + rate.value;
      }, 0) / element.rating.length
    );
  }

  list.sort((a, b) => averageRating(b) - averageRating(a));
  list = list.slice(0, 10);

  return (
    <div className={styles.topRated}>
      <h3>Top 10</h3>
      {list &&
        list.map((cafe) => (
          <React.Fragment key={cafe._id}>
            <Link to={`/cafes/${cafe._id}/menu`}>
              <strong className={styles.cafes}>{cafe.name}</strong>
            </Link>
            <p>
              Rating: {cafe.rating.length ? averageRating(cafe) : 'Unrated'}
            </p>
          </React.Fragment>
        ))}
    </div>
  );
}

export default List;
