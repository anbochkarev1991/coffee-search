import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';

function App() {
  const user = useSelector((state) => state.enter.userName);

  return (
    
    <div className="App">
      <Navbar />
      <Router>

        <Switch>
          {/* <Route path="/profile">
            <Profile />
          </Route> */}
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
            {user && <Link to="/logout">Выйти</Link>}
            {!user && <Link to="/login">Войти</Link>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
