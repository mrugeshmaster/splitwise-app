import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import LandingPage from './LandingPage';

class Main extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={LandingPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/home' component={Home} />
      </div>
    )
  }
}

export default Main;