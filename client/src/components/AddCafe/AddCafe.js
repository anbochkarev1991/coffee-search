import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCafe } from '../../redux/actions/actions';

function AddCafe() {
  const dispatch = useDispatch();
  const [cafe, setCafe] = useState({
    name: '',
    address: '',
    rating: '',
    latitude: '',
    longitude: '',
  });

  const [addCafe, setAddCafe] = useState(false);

  function handleChange({ target: { value, name } }) {
    setCafe({
      ...cafe,
      [name]: value,
    })
  }

  function addCafeForm() {
    setAddCafe(!addCafe);
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
      address: cafe.address,
      latitude: coords[0],
      longitude: coords[1],
    }));
  }

  return (
    <div>
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
              type="text"
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
            <button onClick={addCafeForm} type="button" className="btn btn-outline-success mb-2">
              Добавить новое кафе
            </button>
          </>
        )
      }
    </div>
  );
}

export default AddCafe;
