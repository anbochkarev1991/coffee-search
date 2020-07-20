import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Menu from './components/CafePageBar/Menu/Menu';
import Barista from './components/CafePageBar/Barista/Barista';
import Batch from './components/CafePageBar/Batch/Batch';
import EventsCafe from './components/CafePageBar/EventsCafe/EventsCafe';
import Comments from './components/CafePageBar/Comments/Comments';
import Insta from './components/CafePageBar/Instagram/Instagram';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
// import logo from './logo.svg';
import './App.css';
import CafePage from './pages/cafe/cafe';

function App() {
  const user = useSelector((state) => state.enter.userName);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
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
          <Route path="/cafes/:id">
            <CafePage />
          </Route>
          <PrivateRouter path="/profile">
            <Profile />
          </PrivateRouter>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
