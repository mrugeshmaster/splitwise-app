/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
import axios from 'axios';
import React, { Component } from 'react';
import {
  Alert, Row, Col, Container,
} from 'react-bootstrap';
import NavBar from './NavBar';
import apiHost from '../config';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';
import LeftSidebar from './LeftSidebar';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInvites: [],
      groupMemberships: [],
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  onUpdateInvitation = () => {
    // let newGroupInvites = this.state.groupInvites;
    // newGroupInvites = newGroupInvites.filter((gI) => gI.group_name !== incomingGroupInvite.group_name);
    // incomingGroupInvite.is_member = 'Y';
    // const newGroupMembers = [...this.state.groupMemberships, incomingGroupInvite];
    this.setState({
      groupInvites: [],
      groupMemberships: [],
    });
    this.getGroups();
  }

  getGroups = async () => {
    await axios.get(`${apiHost}/api/getGroups/${localStorage.getItem('user_id')}`)
      .then((response) => {
        response.data.map((res) => {
          if (res.is_member === 'Y') {
            const group = {
              group_name: res.group_name,
              group_image: res.group_image,
              is_member: res.is_member,
            };
            const list = [...this.state.groupMemberships, group];
            this.setState({ groupMemberships: list });
          } else if (res.is_member === 'N') {
            const group = {
              group_name: res.group_name,
              group_image: res.group_image,
              is_member: res.is_member,
            };
            const list = [...this.state.groupInvites, group];
            this.setState({ groupInvites: list });
          }
        });
      }).catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  }

  render() {
    let errorMessage = null;
    if (this.state.message === 'NO_GROUPS') {
      errorMessage = <Alert variant="danger">You are not a part of any group. Create a New Group ! </Alert>;
    }

    return (
      <div>
        <NavBar />
        {errorMessage}
        <div className="mt-5">
          <Row>
            <Col md={{ offset: 1, span: 2 }} className="flex-column"><LeftSidebar /></Col>
            <Col>
              {this.state.groupInvites.length > 0 && (
              <Col md={{ span: 8 }} className="mt-4">
                <h3>Group Invitations</h3>
                <div className="my-5">
                  <Container className="d-flex flex-wrap">
                    {this.state.groupInvites.map((groupInvite) => (
                      <GroupInvitation
                        key={groupInvite}
                        groupInvite={groupInvite}
                        onUpdateInvitation={this.onUpdateInvitation}
                      />
                    ))}
                  </Container>
                </div>
              </Col>
              )}
              {this.state.groupMemberships.length > 0 && (
              <Col md={{ span: 8 }} className="mt-4">
                <h3>Group Membership</h3>
                <div className="my-5">
                  <Container className="d-flex flex-wrap">
                    {this.state.groupMemberships.map((groupMembership) => (
                      <GroupMembership
                        key={groupMembership}
                        groupMembership={groupMembership}
                        onUpdateInvitation={this.onUpdateInvitation}
                      />
                    ))}
                  </Container>
                </div>
              </Col>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Groups;
