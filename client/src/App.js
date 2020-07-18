import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
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
      <div className="App">
        <Navbar />
        <Router>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
      <Router>
        <Route path="/cafes/:id">
          <CafePage />
        </Route>
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
          <EventsCafe />
        </Route>
        <Route path="/cafes/:id/comments">
          <Comments />
        </Route>
        <Route path="/cafes/:id/insta">
          <Insta />
        </Route>
      </Router>
    </>
  )
}

export default App;
