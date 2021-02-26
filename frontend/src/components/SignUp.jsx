import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Container, Form, Button, Row, Col,
} from 'react-bootstrap';
import { userSignUp } from '../actions/signUpUserAction';
import NavBar from './NavBar';
import SplitwiseImage from '../images/logo.svg';
// import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = (e) => {
    // prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.userSignUp(data);

    this.setState({
      signUp: true,
    });
  }

  handleClear = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  }

  render() {
    // redirect based on successful signup
    let redirectVar = null;
    let message = '';
    // console.log(this.props.user, this.state.signUp);
    if (localStorage.getItem('email')) {
      redirectVar = <Redirect to="/home" />;
    } else if (this.props.user.message === 'NEW_USER_CREATED' && this.state.signUp) {
      // alert('You have registered successfully');
      redirectVar = <Redirect to="/login" />;
    } else if (this.props.user.message === 'USER_ALREADY_EXISTS' && this.state.signUp) {
      message = 'User with email id is already registered';
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        {message}
        <Container>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs lg="2">{'\u00A0'}</Col>
            <Col>
              <img src={SplitwiseImage} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="Splitwise" />
            </Col>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={this.state.name} placeholder="Enter Name" onChange={this.handleNameChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleEmailChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} required />
                </Form.Group>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              &nbsp;&nbsp;
                <Button variant="secondary" onClick={this.handleClear}>
                  Clear
                </Button>
              </Form>
            </Col>
            <Col xs lg="2">{'\u00A0'}</Col>
          </Row>

        </Container>
      </div>
    );
  }
}

// SignUp.propTypes = {
//   userSignUp: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

const mapState = (state) => ({
  user: state.signup.user,
});

export default connect(mapState, { userSignUp })(SignUp);
