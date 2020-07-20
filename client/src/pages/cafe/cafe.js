import React, { useEffect } from 'react';
import CafePageBar from '../../components/CafePageBar/CafePageBar';
import { editUser } from '../../redux/actions/enter-actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function CafePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.enter);

  function addToFavorites() {
    user.favorites.push(id);
    dispatch(editUser(user));
  }

  function deleteFromFavorites() {
    const index = user.favorites.indexOf(id);
    user.favorites.splice(index, 1);
    dispatch(editUser(user));
  }

  return (
    <>
      <CafePageBar />
      <button
        type="button"
        onClick={
          user.favorites.includes(id) ? deleteFromFavorites : addToFavorites
        }
      >
        {user.favorites.includes(id)
          ? 'Remove from favorites'
          : 'Add to favorites'}
      </button>
    </>
  );
}
