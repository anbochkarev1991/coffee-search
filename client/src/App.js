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
    <Router>
      <CafePage />
      <Route path="/menu">
        <Menu />
      </Route>
      <Route path="/barista">
        <Barista />
      </Route>
      <Route path="/batch">
        <Batch />
      </Route>
      <Route path="/events">
        <EventsCafe />
      </Route>
      <Route path="/comments">
        <Comments />
      </Route>
      <Route path="/insta">
        <Insta />
      </Route>
    </Router>
  );
}

export default App;
