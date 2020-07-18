import React from 'react';
import { useSelector } from 'react-redux';

function List() {
  const list = useSelector((state) => state.coffee.list);

  return (
    <div>
      <h3>List of cafes</h3>
      {list &&
        list.map((cafe) => (
          <React.Fragment key={cafe._id}>
            <p>
              <strong>{cafe.name}</strong>
            </p>
            <p>Rating: {cafe.rating}</p>
            <p>Longitude: {cafe.longitude}</p>
            <p>Latitude: {cafe.latitude}</p>
          </React.Fragment>
        ))}
    </div>
  );
}

export default List;
