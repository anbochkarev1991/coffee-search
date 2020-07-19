import React, { useEffect } from 'react';
import dotenv from 'dotenv';
import styles from './Map.module.css';
dotenv.config();

function Map() {

  useEffect(() => {
    window.addEventListener('load', handleLoad());
  }, [])

  const cafes = [
    {
      longitude: 55.73443,
      latitude: 37.638413,
      name: 'Bro.We',
      body: 'Лучшая кофейня для братишек на районе',
      footer: 'Мы находимся по адресу Москва, Татарская улица, 5с1',
      hint: 'Кофейня Bro.We',
    },
    {
      longitude: 55.818864,
      latitude: 37.573780,
      name: 'Шоколадница',
      body: 'Обычная шоколадница',
      footer: 'Мы находимся по адресу Москва, Дмитровское шоссе, 13к1',
      hint: 'Шоколадница',
    },
  ]

  function handleLoad() {
    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
      },
    //   {
    //     // Поиск по организациям.
    //     searchControlProvider: 'yandex#search'
    // }
    )
    .geoObjects
    .add(cafes.map((cafe) => {
      new window.ymaps.Placemark([cafe.longitude, cafe.latitude], {
        balloonContentHeader: cafe.name,
        balloonContentBody: cafe.body,
        balloonContentFooter: cafe.footer,
        hintContent: cafe.hint,
      }, {
      preset: 'islands#icon',
      iconColor: '#ff6347'
  })
    })
      
)
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
