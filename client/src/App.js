import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
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
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          {/* <Route path="/cafes/:id">
            <CafePage />
          </Route> */}
          <Route path="/cafes/:id/menu">
            <CafePage />
            <Menu />
          </Route>
          <Route path="/cafes/:id/barista">
            <CafePage />
            <Barista />
          </Route>
          <Route path="/cafes/:id/batch">
            <CafePage />
            <Batch />
          </Route>
          <Route path="/cafes/:id/events">
            <CafePage />
            <EventsCafe />
          </Route>
          <Route path="/cafes/:id/comments">
            <CafePage />
            <Comments />
          </Route>
          <Route path="/cafes/:id/insta">
            <CafePage />
            <Insta />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
