import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
// import logo from './logo.svg';
import './App.css';
import Cafe from './pages/cafe/cafe';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/cafes/:id">
            <Cafe />
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
