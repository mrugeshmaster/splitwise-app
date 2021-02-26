import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router';
import {
  Jumbotron, Container, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import background from '../images/background.jpg';

class LandingPage extends Component {
  render() {
    let redirectVar = null;
    if (localStorage.getItem('user_id')) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <div style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
        }}
        >
          <NavBar />
          <div>

            <Row>
              <Col sm={1}>&nbsp;</Col>
              <Col>
                <Jumbotron style={{ zIndex: 10, background: 'none' }} fluid>
                  <Container>
                    <h1>Splitwise</h1>
                    <h3 className="text-center text-lg-left text-xl-left text-muted font-weight-bold">Less stress when sharing expenses with housemates.</h3>
                    <p className="text">
                      Keep track of your shared expenses and balances
                      {' '}
                      <br />
                      with housemates, trips, groups, friends, and family.
                    </p>
                    <Link to="/signup" className="btn btn-info">Sign up</Link>
                  </Container>
                </Jumbotron>
              </Col>
              <Col>&nbsp;</Col>
            </Row>

          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
