import React, { useState } from 'react';
import Favorites from '../../components/Favotites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/enter-actions';
import styles from './profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.enter);
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState(user);

  function handleChange({ target: { value, name } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function edit() {
    setInputs(user);
    setEditing(!editing);
  }

  function save() {
    setEditing(!editing);
    dispatch(editUser(inputs));
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
    </div>
  );
}

export default Profile;
