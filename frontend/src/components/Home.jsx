import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import LeftSidebar from './LeftSidebar';
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
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <LeftSidebar />
          </Col>
          <Col>
            <h2>
              Hi,
              {this.state.name}
            </h2>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
