import React from 'react';
import { useHistory } from 'react-router-dom'


export default function CafePageBar() {
  const history = useHistory();


  return (

    <>
      <h1 className="titleCafe">Кофейня "Черное золото"</h1>
      <div className="tab">
        <button className="tablinks" onClick={() => history.push("/menu")}>Меню</button>
        <button className="tablinks" onClick={() => history.push("/barista")}>Баристы</button>
        <button className="tablinks" onClick={() => history.push("/batch")}>Купажи</button>
        <button className="tablinks" onClick={() => history.push("/events")}>События</button>
        <button className="tablinks" onClick={() => history.push("/comments")}>Отзывы</button>
        <button className="tablinks" onClick={() => history.push("/insta")}>Instagram</button>
      </div>
    </>
  )
}
