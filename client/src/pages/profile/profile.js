import React, { useState } from 'react';
import Favorites from '../../components/Favotites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../redux/actions/enter-actions';

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

      <h3>Favorite cafes:</h3>
      <Favorites />
    </div>
  );
}

export default Profile;
