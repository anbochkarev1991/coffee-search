import React from 'react';
import { Link, useHistory } from 'react-router-dom'


export default function CafePageBar() {
  const history = useHistory();


  return (

    <>
      <h1 className="titleCafe">Кофейня "Черное золото"</h1>
      <div className="tab">
        <button className="tablinks" onClick={() => history.push("/cafe/:id/menu")}>Меню</button>
        <button className="tablinks" onClick={() => history.push("/cafe/:id/barista")}>Баристы</button>
        <button className="tablinks" onClick={() => history.push("/cafe/:id/batch")}>Купажи</button>
        <button className="tablinks" onClick={() => history.push("/cafe/:id/events")}>События</button>
        <button className="tablinks" onClick={() => history.push("/cafe/:id/comments")}>Отзывы</button>
        <button className="tablinks" onClick={() => history.push("/cafe/:id/insta")}>Instagram</button>
      </div>
    </>
  )
}
