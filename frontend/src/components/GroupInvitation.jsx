/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { Component } from 'react';
import {
  Form, Button, Card, Container,
} from 'react-bootstrap';
import apiHost from '../config';

class GroupInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = { group_name: this.props.groupInvite.group_name };
  }

  onAcceptInvite = () => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      group_name: this.state.group_name,
    };
    axios.post(`${apiHost}/api/acceptInvite/accept`, data)
      .then((response) => {
        if (response.data.message) {
          this.setState({
            message: response.data.message,
          });
          this.props.onUpdateInvitation();
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  onRejectInvite = () => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      group_name: this.state.group_name,
    };
    axios.post(`${apiHost}/api/acceptInvite/reject`, data)
      .then((response) => {
        if (response.data.message) {
          this.setState({
            message: response.data.message,
          });
          console.log(this.state.message);
          this.props.onUpdateInvitation();
        }
      }).catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    let groupElement = null;
    const groupInvitation = this.props.groupInvite;
    if (groupInvitation) {
      const group_image = `${apiHost}/api/upload/group/${groupInvitation.group_image}`;
      groupElement = (
        <Card className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={group_image} />
          <Card.Body>
            <Card.Title>{groupInvitation.group_name}</Card.Title>
            <Button variant="info" onClick={this.onAcceptInvite}>Accept Invite</Button>
            {'\u00A0'}
            {'\u00A0'}
            <Button variant="danger" onClick={this.onRejectInvite}>Reject Invite</Button>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div>
        {groupElement}
      </div>
    );
  }
}
export default GroupInvitation;
