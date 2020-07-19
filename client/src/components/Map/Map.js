import React, { useEffect } from 'react';
import dotenv from 'dotenv';
dotenv.config();

function Map() {

  useEffect(() => {
    window.addEventListener('load', handleLoad());
  }, [])

  function handleLoad() {
    window.ymaps.ready(() => {
      const newMap = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
      })
    })
  }

  return (
    <div>
      <h3>Beautiful map</h3>
      <div id='map' style={{width: "600px", height: "400px"}}></div>
    </div>
  );
}

export default Map;
