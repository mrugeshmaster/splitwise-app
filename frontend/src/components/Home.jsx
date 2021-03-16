import React, { Component } from 'react';
import NavBar from './NavBar';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
    };
  }

  render() {
    // console.log(this.props.user);
    return (
      <div>
        <NavBar />
        <h2>
          Hi,
          {this.state.name}
        </h2>
      </div>
    );
  }
}
export default Home;
