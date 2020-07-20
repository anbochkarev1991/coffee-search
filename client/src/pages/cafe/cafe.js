import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
// import CafePageBar from '../../components/CafePageBar/CafePageBar';
import Menu from '../../components/CafePageBar/Menu/Menu';
import Barista from '../../components/CafePageBar/Barista/Barista';
import Batch from '../../components/CafePageBar/Batch/Batch';
import EventsCafe from '../../components/CafePageBar/EventsCafe/EventsCafe';
import Comments from '../../components/CafePageBar/Comments/Comments';
import Insta from '../../components/CafePageBar/Instagram/Instagram';

export default function CafePage() {
  const history = useHistory();
  const id = useParams()

  return (

    <>
      <h1 className="titleCafe">Кофейня "Черное золото"</h1>
      <div className="tab">
        <button className="tablinks" onClick={() => history.push("/cafes/:id/menu")}>Меню</button>
        <button className="tablinks" onClick={() => history.push("/cafes/:id/barista")}>Баристы</button>
        <button className="tablinks" onClick={() => history.push("/cafes/:id/batch")}>Купажи</button>
        <button className="tablinks" onClick={() => history.push("/cafes/:id/events")}>События</button>
        <button className="tablinks" onClick={() => history.push("/cafes/:id/comments")}>Отзывы</button>
        <button className="tablinks" onClick={() => history.push("/cafes/:id/insta")}>Instagram</button>
      </div>

      <Switch>
        <Route path="/cafes/:id/menu">
          <Menu />
        </Route>
        <Route path="/cafes/:id/barista">
          <Barista />
        </Route>
        <Route path="/cafes/:id/batch">
          <Batch />
        </Route>
        <Route path="/cafes/:id/events">
          <EventsCafe id={id} />
        </Route>
        <Route path="/cafes/:id/comments">
          <Comments />
        </Route>
        <Route path="/cafes/:id/insta">
          <Insta />
        </Route>
      </Switch>
    </>
  )
}
