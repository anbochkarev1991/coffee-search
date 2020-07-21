import React, { useState, useEffect } from 'react';
import Favorites from '../../components/Favotites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/enter-actions';
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
    <div>
      {editing ? (
        <>
          <form>
            <div className={"form-group"}>
              <input
                required
                type="text"
                onChange={handleChange}
                name="login"
                value={inputs.login}
                placeholder="Login"
                className={"form-control"}
              ></input>
            </div>
            <div className={"form-group"}>
              <input
                required
                type="email"
                onChange={handleChange}
                name="email"
                value={inputs.email}
                placeholder="Email"
                className={"form-control"}
              ></input>
            </div>
            {/* <input
            required
            type="text"
            onChange={handleChange}
            name=""
            value={inputs.password}
            placeholder="Password"
          ></input> */}
            <button onClick={save} type="button" className="btn btn-primary mb-2">
              Save
          </button>
            <button onClick={edit} type="button" className="btn btn-primary mb-2">
              Cancel
          </button>
          </form>
        </>
      ) : (
          <>
            <h1>Hello, {user.login}</h1>
            <h3>Email: {user.email}</h3>
            <h3>Birthday: {user.birthday}</h3>
            <button onClick={edit} type="button" className="btn btn-primary mb-2">
              Edit
          </button>
          </>
        )}
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
          {/* <input
                  required
                  type="text"
                  onChange={handleChange}
                  name=""
                  value={inputs.password}
                  placeholder="Password"
                ></input> */}
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
      <h3>Favorite cafes:</h3>
      <Favorites />
    </div>
  );
}

export default Profile;
