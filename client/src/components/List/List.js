import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function List() {
  const list = useSelector((state) => state.coffee.list);

  return (
    <div>
      <h3>Amazing list of cafes</h3>
      {list &&
        list.map((cafe) => (
          <React.Fragment key={cafe._id}>
            <Link to={`/cafes/${cafe._id}`}>
              <strong>{cafe.name}</strong>
            </Link>
            <p>Rating: {cafe.rating}</p>
            <p>Longitude: {cafe.longitude}</p>
            <p>Latitude: {cafe.latitude}</p>
          </React.Fragment>
        ))}
    </div>
  );
}

export default List;
