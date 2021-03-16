import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import apiHost from '../config';

class InvitationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { invitationName: '', invitationEmail: '' };
  }

  onChangeInvitationName = (e) => {
    this.setState({
      invitationName: e.target.value,
    });
  }

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
    console.log(JSON.stringify(data));
    axios.post(`${apiHost}/api/inviteMember`, data)
      .then((response) => {
        console.log(response);
        alert('Invitation Sent');
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="5">
              <Form.Control type="text" name="invitationName" placeholder="Name" onChange={this.onChangeInvitationName} />
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Control type="email" name="invitationEmail" placeholder="Email" onChange={this.onChangeInvitationEmail} />
            </Form.Group>
            <Form.Group as={Col} md="2"><Button onClick={this.onInvite}>Invite</Button></Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
export default InvitationForm;
