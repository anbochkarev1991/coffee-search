import React from 'react';
import CafePageBar from '../../components/CafePageBar/CafePageBar';
import { editUser } from '../../redux/actions/enter-actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function CafePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.enter);

  function addToFavorites() {
    if (!user.favorites.includes(id)) {
      user.favorites.push(id);
      dispatch(editUser(user));
    }
  }

  return (
    <>
      <CafePageBar />
      <button type="button" onClick={addToFavorites}>
        Add to favorites
      </button>
    </>
  );
}
