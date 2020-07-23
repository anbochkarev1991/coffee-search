import React, { useEffect } from 'react';
import dotenv from 'dotenv';
import Trends from '../../components/Trends/Trends';
import Map from '../../components/Map/Map';
import List from '../../components/List/List';
import styles from './Home.module.css';
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
    <>
      <div className={styles.background}>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col'}>
            <Map />
          </div>
          <div className={'col'}>
            <List />
          </div>
          <div className={'col'}>
            <Trends />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
