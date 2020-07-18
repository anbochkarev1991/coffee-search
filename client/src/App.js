import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/home';

function App() {
  return (
    
    <div className="App">
      <Navbar />
      <Signup />
      <Router>
        <Switch>
          {/* <Route path="/profile">
            <Profile />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
