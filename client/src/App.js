import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Menu from './Components/CafePageBar/Menu/Menu';
import Barista from './Components/CafePageBar/Barista/Barista';
import Batch from './Components/CafePageBar/Batch/Batch';
import EventsCafe from './Components/CafePageBar/EventsCafe/EventsCafe';
import Comments from './Components/CafePageBar/Comments/Comments';
import Insta from './Components/CafePageBar/Instagram/Instagram';
// import logo from './logo.svg';
import './App.css';
import CafePage from './pages/cafe/cafe';

function App() {
  return (
    <>
      <Router>
        <Route path="/cafe/:id">
          <CafePage />
        </Route>
        <Route path="/cafe/:id/menu">
          <Menu />
        </Route>
        <Route path="/cafe/:id/barista">
          <Barista />
        </Route>
        <Route path="/cafe/:id/batch">
          <Batch />
        </Route>
        <Route path="/cafe/:id/events">
          <EventsCafe />
        </Route>
        <Route path="/cafe/:id/comments">
          <Comments />
        </Route>
        <Route path="/cafe/:id/insta">
          <Insta />
        </Route>
      </Router>
    </>
  );
}

export default App;
