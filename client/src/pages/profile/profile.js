import React, { useState } from 'react';
import Favorites from '../../components/Favotites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/user-actions';

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
    setEditing(!editing);
  }

  function cancelEdit() {
    setEditing(!editing);
    setInputs(user);
  }

  function save() {
    dispatch(editUser(inputs));
    setEditing(!editing);
  }

  return (
    <div>
      {editing ? (
        <>
          <input
            required
            type="text"
            onChange={handleChange}
            name="login"
            value={inputs.login}
            placeholder="Login"
          ></input>
          <input
            required
            type="email"
            onChange={handleChange}
            name="email"
            value={inputs.email}
            placeholder="Email"
          ></input>
          <input
            required
            type="text"
            onChange={handleChange}
            name=""
            value={inputs.password}
            placeholder="Password"
          ></input>
          <button onClick={save} type="button">
            Save
          </button>
          <button onClick={cancelEdit} type="button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1>Hello, {user.login}</h1>
          <h3>Email: {user.email}</h3>
          <h3>Birthday: {user.birthday}</h3>
          <button onClick={edit} type="button">
            Edit
          </button>
        </>
      )}

      <h3>Favorite cafes:</h3>
      <Favorites />
    </div>
  );
}

export default Profile;
