import React, { useEffect } from 'react';
import Trends from '../../components/Trends/Trends';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import { useDispatch } from 'react-redux';
import { loadCafeListSaga } from '../../redux/actions/actions';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCafeListSaga());
  }, [dispatch]);

  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col"}>
          <Trends />
        </div>
        <div className={"col"}>
          <Map />
        </div>
        <div className={"col"}>
        <List />
        </div>
      </div>
    </div>
  );
}

export default Home;
