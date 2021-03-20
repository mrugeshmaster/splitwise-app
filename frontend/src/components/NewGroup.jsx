/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Row, Col, Form, Button, Image, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import NavBar from './NavBar';
import apiHost from '../config';
import InvitationForm from './InvitationForm';

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationListSize: 1,
    };
    this.getAllNames();
  }

  getAllNames = async () => {
    await axios.get(`${apiHost}/api/allnames/${localStorage.getItem('user_id')}`)
      .then((response) => {
        this.setState({
          names: response.data,
        });
      }).catch((err) => {
        this.setState({
          message: err.response,
        });
      });
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
    formData.append('groupImage', this.state.file);
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(`${apiHost}/api/upload/group/${this.state.groupName}`, formData, uploadConfig)
      .then((response) => {
        alert('Group Image uploaded successfully!');
        this.setState({
          filename: 'Choose your avatar',
          groupImage: response.data.message,
        });
        console.log(this.state.groupImage);
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
    console.log(this.state.names);
    let selfMember = null;
    const invitationForms = [];
    let errorMessage = null;

    if (this.state.message === 'DUPLICATE_GROUP') {
      errorMessage = <Alert variant="danger">Group Name Taken. Please enter unique group name.</Alert>;
    }
    selfMember = (
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Control type="text" name="invite_name" placeholder={localStorage.getItem('name')} disabled />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Control type="email" name="invite_email" placeholder={localStorage.getItem('email')} disabled />
        </Form.Group>
      </Form.Row>
    );

    if (this.state.names && this.state.names.length > 0) {
      console.log(this.state.names);
      for (let i = 1; i <= this.state.invitationListSize; i += 1) {
        invitationForms.push(
          <InvitationForm
            names={this.state.names}
            groupName={this.state.groupName}
            onCancel={this.onCancel}
          />,
        );
      }
    }

    let groupImage = null;
    const filename = this.state.filename || 'Choose Group Image';
    if (this.state) {
      groupImage = `${apiHost}/api/upload/group/${this.state.groupImage}`;
    }

    return (
      <div>
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 3, offset: 2 }}>
              <Form onSubmit={this.onUpload}>
                <Form.Row className="mt-4">
                  <Form.Group as={Col} md={3}>
                    <Image style={{ width: '17rem' }} src={groupImage} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3}>
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
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit">Upload</Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
            <Col md={{ span: 6 }}>
              <h5 className="text-muted">START A NEW GROUP</h5>
              {errorMessage}
              <Form onSubmit={this.onCreate}>
                <Form.Row>
                  <Form.Group as={Col} md="4">
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
              <Divider />
              <h5 className="text-muted">GROUP MEMBERS</h5>
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
