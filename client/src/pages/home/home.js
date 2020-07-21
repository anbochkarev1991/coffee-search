import React, { useEffect } from 'react';
import dotenv from 'dotenv';
import Trends from '../../components/Trends/Trends';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import { useDispatch } from 'react-redux';
import { loadCafeListSaga } from '../../redux/actions/actions';
import { loadAllEventsSaga } from '../../redux/actions/events-actions';
dotenv.config();

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCafeListSaga());
    dispatch(loadAllEventsSaga());
  }, [dispatch]);

  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col'}>
          <Trends />
        </div>
        <div className={'col'}>
          <Map />
        </div>
        <div className={'col'}>
          <List />
        </div>
      </div>
    </div>
  );
}

export default Home;
