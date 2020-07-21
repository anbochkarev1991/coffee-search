import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dotenv from 'dotenv';
import styles from './Map.module.css';
import AddCafe from '../AddCafe/AddCafe';
import { searchCafe } from '../../redux/actions/actions';
dotenv.config();

function Map() {
  const dispatch = useDispatch();
  const [mapActive, setMapActive] = useState(false);
 
  const cafes = useSelector((state) => state.coffee.list);
  const user = useSelector((state) => state.enter.login);
  const search = useSelector((state) => state.coffee.search);
  useEffect(() => {
    if (cafes && cafes.length > 0 && !mapActive) {
      handleLoad();
      setMapActive(true)
    }
  }, [cafes]);

  // useEffect(()=>{
  //   console.log('hg');
  // },[inputs])
  
  function handleChange({ target: { name, value } }) {
    dispatch(searchCafe({
      ...search,
      [name]: value,
    }))
  }
  
  async function handleSubmit(event) {
    // event.preventDefault();
    const cafe = cafes.find((cafe) => cafe.name === search.name);
    console.log(cafe);
    if (cafe) {
      dispatch(searchCafe({
        ...search,
        id: cafe._id,
        rating: cafe.rating,
        latitude: cafe.latitude,
        longitude: cafe.longitude,
      }))
    }
  }

  function handleLoad() {
    
    navigator.geolocation.getCurrentPosition(function (position) {
      const coords = search.latitude ? [search.latitude, search.longitude] : [position.coords.latitude, position.coords.longitude];
      window.ymaps.ready(() => {
        const newMap = new window.ymaps.Map('map', {
          center: coords,
          zoom: 13,
        }),

          cafesCollection = new window.ymaps.GeoObjectCollection(null, {
            present: 'islands#icon',
            iconColor: '#ff6347',
          })
      
        for (let i = 0; i < cafes.length; i++) {
          cafesCollection.add(new window.ymaps.Placemark(search.latitude ? [search.latitude, search.longitude] : [cafes[i].latitude, cafes[i].longitude], {
            balloonContentHeader: `<a href=/cafes/${search.id ? search.id : cafes[i]._id}/menu>${search.name ? search.name : cafes[i].name}</a>`,
            balloonContentFooter: `Рейтинг: ${search.rating ? search.rating : cafes[i].rating}`,
            hintContent: search.name ? search.name : cafes[i].name,
          }));
        }

        newMap.geoObjects.add(cafesCollection);

        const myPlacemark = new window.ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
          balloonContentHeader: 'Ваше местоположение',
          hintContent: 'Ваше местоположение',
        })

        newMap.geoObjects.add(myPlacemark);
      });
    });
  }

  return (
    <>
      <h3>Beautiful map</h3>
      <div className={styles.mapPosition}>
        <div id="map" style={{ width: "700px", height: "600px" }}></div>
      </div>
      <form className={"form-inline"} onSubmit={handleSubmit}>
        <input 
          className={"form-control mr-sm-2"}
          style={{ width: "600px", margin: "0 0 0 20px" }}
          type="search"
          name="name"
          onChange={handleChange} 
          placeholder="Найти кафе"
          aria-label="Search" 
        />
        <button className={"btn btn-outline-success my-2 my-sm-0"} type="submit" style={{ margin: "0 0 0 20px" }}>Search</button>
      </form>
      {user && <AddCafe />}
    </>
  );
}

export default Map;
