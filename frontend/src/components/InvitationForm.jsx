/* eslint-disable react/no-access-state-in-setstate */
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import apiHost from '../config';
import SearchBar from './SearchBar';

class InvitationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationName: '',
      invitationEmail: '',
      email: '',
      showButtons: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.names !== prevState.names) {
      return {
        names_email: nextProps.names,
        names: nextProps.names.map((res) => res.name),
      };
    }
    return { names_email: [], names: [] };
  }

  // onChangeInvitationName = (e) => {
  //   this.setState({
  //     invitationName: e.target.value,
  //   });
  // }

  onChangeInvitationEmail = (e) => {
    this.setState({
      invitationEmail: e.target.value,
    });
  }

  onInvite = (e) => {
    e.preventDefault();
    console.log(this.props.groupName);
    const data = {
      groupName: this.props.groupName,
      invitationName: this.state.invitationName,
      invitationEmail: this.state.invitationEmail,
    };
    console.log(`data: ${JSON.stringify(data)}`);
    axios.post(`${apiHost}/api/inviteMember`, data)
      .then((response) => {
        console.log(response);
        // alert('Invitation Sent');
        this.setState({
          showButtons: false,
        });
      }).catch((err) => {
        console.log(err.response);
      });
  }

  onSearchName = async (name) => {
    const emailObj = this.state.names_email.find((res) => res.name === name);
    await this.setState({
      email: emailObj.email,
      invitationName: name,
      invitationEmail: emailObj.email,
    });
    // this.setState({
    //   invitationName: name,
    //   invitationEmail: e.target.value,
    // });
  }

  render() {
    console.log(this.props.names);
    return (
      <div>
        <Form>
          <Form.Row className="md-0 pd-0">
            <Form.Group as={Col} md="4">
              {this.state.names
              && (
              <SearchBar
                names={this.state.names}
                onSearchName={this.onSearchName}
              />
              )}
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Control type="email" name="invitationEmail" value={this.state.email} placeholder="Email" onChange={this.onChangeInvitationEmail} />
            </Form.Group>
            { this.state.showButtons && (
              <Form.Group className="d-flex m-0 p-0" fluid>
                <Form.Group as={Col} md="auto m-0 p-0">
                  <Button onClick={this.onInvite}>Invite</Button>
                </Form.Group>
                <Form.Group as={Col} md="auto ml-1 pl-1">
                  <Button variant="outline-danger" id="cancel" onClick={this.props.onCancel}>
                    <X />
                  </Button>
                </Form.Group>
              </Form.Group>
            )}
            { !this.state.showButtons && (
              <h4 className="text-muted"> Invited ! </h4>
            )}
          </Form.Row>
        </Form>
      </div>
    );
  }
}
export default InvitationForm;
