/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Row, Col, Form, Button, Image, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import apiHost from '../config';
// import SplitwiseImage from '../images/logo.svg';
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
    const data = {
      user_id: localStorage.getItem('user_id'),
      groupName: this.state.groupName,
    };
    axios.post(`${apiHost}/api/createGroup`, data)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      }).catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  }

  onGroupImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.file);
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(`${apiHost}/api/upload/group/${this.state.groupName}`, formData, uploadConfig)
      .then((response) => {
        alert('Image uploaded successfully!');
        this.setState({
          filename: 'Choose your avatar',
          image: response.data.message,
        });
        console.log(this.state.image);
        // this.getUser();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  onCancel = () => {
    this.setState((prevState) => ({ invitationListSize: prevState.invitationListSize - 1 }));
  }

  onAddInvitationForm = () => {
    // invitationListSize;
    this.setState((prevState) => ({ invitationListSize: prevState.invitationListSize + 1 }));
  }

  render() {
    let selfMember = null;
    const invitationForms = [];
    let errorMessage = null;

    if (this.state.message === 'DUPLICATE_GROUP') {
      errorMessage = <Alert variant="danger">Group Name Taken. Please enter unique group name.</Alert>;
    }
    selfMember = (
      <Form.Row>
        <Form.Group as={Col} md="6">
          <Form.Control type="text" name="invite_name" placeholder={localStorage.getItem('name')} disabled />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Control type="email" name="invite_email" placeholder={localStorage.getItem('email')} disabled />
        </Form.Group>
      </Form.Row>
    );

    for (let i = 1; i <= this.state.invitationListSize; i += 1) {
      invitationForms.push(<InvitationForm groupName={this.state.groupName} onCancel={this.onCancel} />);
    }

    let image = null;
    const filename = this.state.filename || 'Choose Group Image';
    if (this.state) {
      image = `${apiHost}/api/upload/group/${this.state.image}`;
    }

    return (
      <div>
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <Image style={{ width: '17rem' }} src={image} />
              <Form onSubmit={this.onUpload}>
                <Form.Group as={Col} className="lg-3">
                  <Form.File
                    className="mt-3"
                    name="image"
                    id="image"
                    style={{ width: '17rem' }}
                    accept="image/*"
                    label={filename}
                    onChange={this.onGroupImageChange}
                    custom
                  />
                  <br />
                  <Button type="submit">Upload</Button>
                </Form.Group>
              </Form>
            </Col>
            <Col md={{ span: 3 }}>
              <h5>START A NEW GROUP</h5>
              {errorMessage}
              <Form onSubmit={this.onCreate}>
                <Form.Row>
                  <Form.Group as={Col} md="8">
                    <Form.Control
                      type="text"
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.onChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Button type="submit">Create</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
              <hr />
              <h5>GROUP MEMBERS</h5>
              <Form>
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
