import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Trends.module.css';

function Trends() {
  const list = useSelector((state) => state.events.list);

  return (
    <div>
      <h3>News and events</h3>
      <ul className={styles.trendsList}>
        {list &&
          list.map((event) => (
            <React.Fragment key={event.date}>
              <Link to={`/cafes/${event.location}`}>
                <li>{event.title}</li>
              </Link>
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
}

export default Trends;
