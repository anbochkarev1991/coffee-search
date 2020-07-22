import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Trends.module.css';

function Trends() {
  let list = useSelector((state) => state.events.list);

  list.sort((a, b) => new Date(a.date) - new Date(b.date));
  list = list.slice(0, 10);

  return (
    <div className={styles.trendsList}>
      <h3>Events</h3>
      <ul>
        {list &&
          list.map((event) => (
            <React.Fragment key={event._id}>
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
