import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dotenv from 'dotenv';
import styles from './Map.module.css';
dotenv.config();

function Map() {



const [mapActive, setMapActive] = useState(false)
  const cafes = useSelector((state) => state.coffee.list);
  
  useEffect(() => {
    if (cafes && cafes.length > 0 && !mapActive) {
      (() => handleLoad())();
      setMapActive(true)
    }
  }, [cafes]);
  
  function handleLoad() {

  navigator.geolocation.getCurrentPosition(function(position) {

    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map('map', {
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 13,
      }),

    cafesCollection = new window.ymaps.GeoObjectCollection(null, {
      present: 'islands#icon',
      iconColor: '#ff6347',
    })
    
    for (let i = 0; i < cafes.length; i++) {
      cafesCollection.add(new window.ymaps.Placemark([cafes[i].latitude, cafes[i].longitude], {
        balloonContentHeader: cafes[i].name,
        balloonContentBody: `<a href=/cafes/${cafes[i]._id}/menu>Перейти на страницу кафе</a>`,
        balloonContentFooter: `Рейтинг: ${cafes[i].rating}`,
        hintContent: cafes[i].name,
      }));
    }
    
    const myGeocoder = window.ymaps.geocode("Ул. Вавилова, 1");
      myGeocoder.then(
    function (res) {
      newMap.geoObjects.add(res.geoObjects);
      console.log(res.geoObjects._boundsAggregator._geoBounds[0]);
    },
    function (err) {
      console.log(err);
    }
);

    newMap.geoObjects.add(cafesCollection);

    const myPlacemark = new window.ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
      balloonContentHeader: 'Ваше местоположение',
      hintContent: 'Ваше местоположение',
    })

    newMap.geoObjects.add(myPlacemark);
  })
});
}

  return (
    <>
      <h3>Beautiful map</h3>
      <div className={styles.mapPosition}>
        <div  id="map" style={{width: "700px", height: "600px"}}></div>
      </div>
    </>
  );
}

export default Map;
