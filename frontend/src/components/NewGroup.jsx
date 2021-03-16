/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Row, Col, Form, Button, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import apiHost from '../config';
import SplitwiseImage from '../images/logo.svg';
import InvitationForm from './InvitationForm';

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationListSize: 1,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onCreate = (e) => {
    e.preventDefault();
    // const user_id = localStorage.getItem('user_id');
    // const group_name = { ...this.state };
    const data = {
      user_id: localStorage.getItem('user_id'),
      groupName: this.state.groupName,
    };
    axios.post(`${apiHost}/api/createGroup`, data)
      .then((response) => {
        this.setState({
          groupCreated: response.data.message,
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  onAddInvitationForm = () => {
    // invitationListSize;
    this.setState((prevState) => ({ invitationListSize: prevState.invitationListSize + 1 }));
  }

  render() {
    let selfMember = null;
    const invitationForms = [];
    if (this.state.groupCreated === 'GROUP_CREATED') {
      selfMember = (
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Control type="text" name="invite_name" placeholder={localStorage.getItem('name')} onChange={this.onAddPersonName} disabled />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control type="email" name="invite_email" placeholder={localStorage.getItem('email')} onChange={this.onAddPersonEmail} disabled />
          </Form.Group>
        </Form.Row>
      );
    }

    for (let i = 1; i <= this.state.invitationListSize; i += 1) {
      invitationForms.push(<InvitationForm groupName={this.state.groupName} />);
    }

    return (
      <div>
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <Image src={SplitwiseImage} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="Splitwise" />
            </Col>
            <Col md={{ span: 3 }}>
              <h5>START A NEW GROUP</h5>
              <Form inline onSubmit={this.onCreate}>
                <Form.Control
                  type="text"
                  name="groupName"
                  value={this.state.groupName}
                  onChange={this.onChange}
                  required
                />
                {'\u00A0'}
                <Button type="submit">Create</Button>
              </Form>
              <hr />
              <h5>GROUP MEMBERS</h5>
              <Form>
                {/* <Form.Row>{personInvite}</Form.Row> */}
                {selfMember}
                <div>
                  {invitationForms}
                </div>
                <Form.Row>
                  <Form.Group>
                    <Button onClick={this.onAddInvitationForm}>+ Add a Person</Button>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Link to="/home">
                    <Button>Save</Button>
                  </Link>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row />
        </div>
      </div>
    );
  }
}
export default NewGroup;