/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Form, Button, Col, Card, CardDeck, Container,
} from 'react-bootstrap';
import apiHost from '../config';

class GroupMembership extends Component {
  render() {
    let groupElements = [];
    const groupMember = this.props.groupMembership;
    console.log(`Group Memberships: ${JSON.stringify(groupMember)}`);
    if (groupMember) {
      // console.log(`One Group Membership: ${JSON.stringify(groupMembership)}`)
      const group_image = `${apiHost}/api/upload/group/${groupMember.group_image}`;
      groupElements = (
        <Card className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" style={{ width: '100%', height: '60%' }} src={group_image} />
          <Card.Body>
            <Card.Title>{groupMember.group_name}</Card.Title>
            <Button variant="primary">Visit Group</Button>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div>
        {groupElements}
      </div>
    );
  }
}
export default GroupMembership;
