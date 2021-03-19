/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Form, Button, Col, Card, CardDeck, Container, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiHost from '../config';

class GroupMembership extends Component {
  constructor(props) {
    super(props);
    this.state = { group_name: this.props.groupMembership.group_name };
  }

  onLeave = () => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      group_name: this.state.group_name,
    };
    axios.post(`${apiHost}/api/leavegroup`, data)
      .then((response) => {
        console.log(response);
        if (response.data.message === 'ALL_BALANCE_SETTLED') {
          this.props.onUpdateInvitation();
        } else {
          this.setState({
            message: response.data.message,
          });
        }
      }).catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    let groupElements = [];
    const groupMember = this.props.groupMembership;

    if (groupMember) {
      // console.log(`One Group Membership: ${JSON.stringify(groupMembership)}`)
      const group_image = `${apiHost}/api/upload/group/${groupMember.group_image}`;
      groupElements = (
        <Card className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ width: '100%', height: '60%' }} src={group_image} />
          <Card.Body>
            <Card.Title>{groupMember.group_name}</Card.Title>
            <Link to={{ pathname: '/groupdetails', state: { group_name: groupMember.group_name } }}>
              <Button variant="info">Visit Group</Button>
            </Link>
            {'\u00A0'}
            {'\u00A0'}
            <Button variant="danger" onClick={this.onLeave}>Leave Group</Button>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div>
        {this.state.message && (
        <Alert variant="danger">
          Please settle all balances before leaving group
        </Alert>
        ) }
        {groupElements}
      </div>
    );
  }
}
export default GroupMembership;
