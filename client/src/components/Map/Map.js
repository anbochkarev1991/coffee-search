import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dotenv from 'dotenv';
import styles from './Map.module.css';
dotenv.config();

function Map() {

  const cafes = useSelector((state) => state.coffee.list);

  useEffect(() => {
    window.addEventListener('load', handleLoad());
  }, []);

  function handleLoad() {
    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
      }),
    cafesCollection = new window.ymaps.GeoObjectCollection(null, {
        present: 'islands#icon',
        iconColor: '#ff6347',
      })

      for (let i = 0; i < cafes.length; i++) {
        cafesCollection.add(new window.ymaps.Placemark([cafes[i].latitude, cafes[i].longitude], {
          balloonContentHeader: cafes[i].name,
          balloonContentFooter: `Рейтинг: ${cafes[i].rating}`,
          hintContent: cafes[i].name,
        }));
      }

      newMap.geoObjects.add(cafesCollection);
    })
  }

  return (
    <>
      <h3>Beautiful map</h3>
      <div className={styles.mapPosition}>
        <div id="map" style={{width: "600px", height: "400px"}}></div>
      </div>
    </>
  );
}

export default Map;
