import React, { useState, useEffect } from 'react';
import Favorites from '../../components/Favotites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/enter-actions';
import styles from './profile.module.css';
import { addNewCafe } from '../../redux/actions/actions';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.enter);
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState(user);
  const [cafe, setCafe] = useState({
    name: '',
    address: '',
    rating: '',
  });

  const [addCafe, setAddCafe] = useState(false);

  function handleChange({ target: { value, name } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
    setCafe({
      ...cafe,
      [name]: value,
    })
  }

  function edit() {
    setInputs(user);
    setEditing(!editing);
  }

  function addCafeForm() {
    setInputs(user);
    setAddCafe(!addCafe);
  }

  function save() {
    setEditing(!editing);
    dispatch(editUser(inputs));
  }


  async function searchCoordinates(address) {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=95ef75db-c7f0-447b-9810-88ce1efe26d6&geocode=${address}&format=json`);
    let result = await response.json();
    result = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
    return [Number(result[0]), Number(result[1])];
  }

  async function saveCafe(event) {
    event.preventDefault();
    setAddCafe(!addCafe);
    const coords = await searchCoordinates(cafe.address);
    dispatch(addNewCafe({
      ...cafe,
      latitude: coords[0],
      longitude: coords[1],
    }));
  }
  //   const myGeocoder = window.ymaps.geocode("Соловьиный проезд, 2");
  //   myGeocoder.then(
  // function (res) {
  //   // newMap.geoObjects.add(res.geoObjects);
  //   console.log(res.geoObjects.properties._data.metaDataProperty.GeocoderResponseMetaData.boundedBy[0].reverse());
  // },
  // function (err) {
  //   console.log(err);
  // }
  // );

  return (
    <div className={styles.profile}>
      {editing ? (
        <div className={styles.userInfo}>
          <form>
            <div className={'form-group'}>
              <input
                required
                type="text"
                onChange={handleChange}
                name="login"
                value={inputs.login}
                placeholder="Login"
                className={'form-control'}
              ></input>
            </div>
            <div className={'form-group'}>
              <input
                required
                type="email"
                onChange={handleChange}
                name="email"
                value={inputs.email}
                placeholder="Email"
                className={'form-control'}
              ></input>
            </div>
            <button
              onClick={save}
              type="button"
              className="btn btn-primary mb-2"
            >
              Save
            </button>
            <button
              onClick={edit}
              type="button"
              className="btn btn-primary mb-2"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <h4>Login: {user.login}</h4>
          <h4>Email: {user.email}</h4>
          {user.birthday && <h3>Birthday: {user.birthday}</h3>}
          <button onClick={edit} type="button" className="btn btn-primary mb-2">
            Edit info
          </button>
        </div>
      )}
      <div className={styles.favsContainer}>
        <h2>Favorite cafes:</h2>
        <Favorites />
      </div>


      {addCafe ?
        (<form onSubmit={saveCafe}>
          <div className={"form-group"}>
            <input
              required
              type="text"
              onChange={handleChange}
              name="name"
              value={cafe.name}
              placeholder="Name"
              className={"form-control"}
            />
          </div>
          <div className={"form-group"}>
            <input
              required
              type="address"
              onChange={handleChange}
              name="address"
              value={cafe.address}
              placeholder="Address"
              className={"form-control"}
            />
          </div>
          <div className={"form-group"}>
            <input
              required
              type="text"
              onChange={handleChange}
              name="rating"
              value={cafe.rating}
              placeholder="Rating"
              className={"form-control"}
            />
          </div>
          <button onClick={saveCafe} type="button" className="btn btn-primary mb-2">
            Save
          </button>
          <button onClick={addCafeForm} type="button" className="btn btn-primary mb-2">
            Cancel
          </button>
        </form>) : (
          <>
            <br />
            <button onClick={addCafeForm} type="button" className="btn btn-primary mb-2">
              Add cafe
            </button>
          </>
        )
      }
    </div>
  );
}

export default Profile;
