import React from 'react';
import { useHistory } from 'react-router-dom';

export default function CafePageBar() {
  const history = useHistory();

  return (
    <>
      <h1 className="titleCafe">Кофейня "Черное золото"</h1>
      <div className="tab">
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/menu')}
        >
          Меню
        </button>
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/barista')}
        >
          Баристы
        </button>
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/batch')}
        >
          Купажи
        </button>
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/events')}
        >
          События
        </button>
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/comments')}
        >
          Отзывы
        </button>
        <button
          className="tablinks"
          onClick={() => history.push('/cafes/:id/insta')}
        >
          Instagram
        </button>
      </div>
    </>
  );
}
