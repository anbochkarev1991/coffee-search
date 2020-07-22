import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dotenv from 'dotenv';
import styles from './Map.module.css';
import AddCafe from '../AddCafe/AddCafe';
import { searchCafe } from '../../redux/actions/actions';
import { cities } from './cities';
dotenv.config();

function Map() {
  const dispatch = useDispatch();
  const [mapActive, setMapActive] = useState(false);
  const [newMap, setNewMap] = useState();
  const [error, setError] = useState(false);
  const [city, setCity] = useState();

  const cafes = useSelector((state) => state.coffee.list);
  const user = useSelector((state) => state.enter.login);
  const search = useSelector((state) => state.coffee.search);
  useEffect(() => {
    if (cafes && cafes.length > 0 && !mapActive) {
      handleLoad();
      setMapActive(true)
    }
  }, [cafes]);

  function handleChange({ target: { name, value } }) {
    dispatch(searchCafe({
      ...search,
      [name]: value,
    }))
  }

  async function selectChange({ target : { value }}) {
    const coords = await searchCoordinates(value);
    newMap.setCenter(coords, 13);
  }

  async function searchCoordinates(address) {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=95ef75db-c7f0-447b-9810-88ce1efe26d6&geocode=${address}&format=json`);
    let result = await response.json();
    result = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
    return [Number(result[0]), Number(result[1])];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const coords = await searchCoordinates(search.address);
      console.log(coords);
      const cafe = cafes.find((cafe) => cafe.name.toLowerCase() === search.name.toLowerCase() && cafe.latitude === coords[0] && cafe.longitude === coords[1]);
      console.log(cafe);
      if (coords && cafe) {
        dispatch(searchCafe({
          ...search,
          id: cafe._id,
          name: cafe.name,
          // address: cafe.address,
          rating: cafe.rating,
          latitude: cafe.latitude,
          longitude: cafe.longitude,
        }));
        newMap.setCenter(coords, 16)
      }
    } catch (err) {
      console.log(err);
      setError('Неправильно введено название и/или адрес кафе');
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

        setNewMap(newMap)
      });
    });
  }

  return (
    <>
      <h3>Beautiful map</h3>
      <p>Выберете город:</p>
      <select onChange={selectChange}>
        <option>Москва</option>
        <option>Санкт-Петербург</option>
        {cities.map((city) => <option>{city}</option>)}
      </select>
      <div className={styles.mapPosition}>
        <div id="map" style={{ width: "600px", height: "500px" }}></div>
      </div>
      <form className={"form-inline justify-content-center"} onSubmit={handleSubmit}>
        {error && <h4 className={"form-control mr-sm-2"} style={{ color: "tomato", border: "1px solid lightgrey", width: "600px" }}>{error}</h4>}
        <input
          className={"form-control mr-sm-2 d-flex"}
          style={{ width: "230px", margin: "0 0 0 20px" }}
          type="search"
          name="name"
          onChange={handleChange}
          placeholder="Название"
          aria-label="Search"
        />
        <input
          className={"form-control mr-sm-2"}
          style={{ width: "230px", margin: "0 0 0 20px" }}
          type="search"
          name="address"
          onChange={handleChange}
          placeholder="Адрес"
          aria-label="Search"
        />
        <button className={"btn btn-outline-success my-2 my-sm-0"} type="submit" style={{ margin: "0 0 0 20px" }}>Искать</button>
      </form>
      {user && <AddCafe />}
    </>
  );
}

export default Map;
