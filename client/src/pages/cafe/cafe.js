import React, { useEffect, useState } from 'react';
import { editUser } from '../../redux/actions/enter-actions';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { addRate } from '../../redux/actions/actions';
import Menu from '../../components/CafePageBar/Menu/Menu';
import Barista from '../../components/CafePageBar/Barista/Barista';
import Batch from '../../components/CafePageBar/Batch/Batch';
import EventsCafe from '../../components/CafePageBar/EventsCafe/EventsCafe';
import Comments from '../../components/CafePageBar/Comments/Comments';
import Insta from '../../components/CafePageBar/Instagram/Instagram';
import styles from './cafe.module.css';
import Rating from 'react-rating';

export default function CafePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.enter);
  const [cafe, setCafe] = useState({});

  let averageRating;
  if (cafe.rating) {
    averageRating =
      cafe.rating.reduce((acc, rate) => {
        return acc + rate.value;
      }, 0) / cafe.rating.length;
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/cafes/${id}`);
      const json = await response.json();
      setCafe(json.cafe);
    })();
  }, [setCafe]);

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
      <div className={styles.tab}>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/menu`)}
        >
          Меню
        </button>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/barista`)}
        >
          Бариста
        </button>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/batch`)}
        >
          Зерно
        </button>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/events`)}
        >
          События
        </button>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/comments`)}
        >
          Отзывы
        </button>
        <button
          className={styles.tablinks}
          onClick={() => history.push(`/cafes/${id}/insta`)}
        >
          Instagram
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.cafeTitle}>
          <h1>{cafe.name}</h1>
          {user.login && (
            <button
              type="button"
              style={{ border: 0 }}
              className={
                user.favorites.includes(id)
                  ? 'btn btn btn-outline-danger my-2 my-sm-0'
                  : 'btn btn btn-outline-light my-2 my-sm-0'
              }
              onClick={
                user.favorites.includes(id)
                  ? deleteFromFavorites
                  : addToFavorites
              }
            >
              {user.favorites.includes(id) ? (
                <i class="fa fa-heart fa-2x" aria-hidden="true"></i>
              ) : (
                <i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>
              )}
            </button>
          )}
        </div>

        <div className={styles.rating}>
          <Rating
            emptySymbol={'fa fa-star-o fa-2x'}
            fullSymbol={'fa fa-star fa-2x'}
            start={0}
            stop={5}
            step={1}
            initialRating={averageRating}
            quiet={false}
            onClick={(value) => {
              const rate = {
                value,
                user: user._id,
                cafe: id,
              };
              dispatch(addRate(rate));
            }}
          />
        </div>
        <Switch>
          <Route path="/cafes/:id/menu">
            <Menu id={id} />
          </Route>
          <Route path="/cafes/:id/barista">
            <Barista id={id} />
          </Route>
          <Route path="/cafes/:id/batch">
            <Batch id={id} />
          </Route>
          <Route path="/cafes/:id/events">
            <EventsCafe id={id} />
          </Route>
          <Route path="/cafes/:id/comments">
            <Comments id={id} />
          </Route>
          <Route path="/cafes/:id/insta">
            <Insta />
          </Route>
        </Switch>
      </div>
    </>
  );
}
