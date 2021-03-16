/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { Component } from 'react';
import {
  Alert, Row, Col, Container,
} from 'react-bootstrap';
import NavBar from './NavBar';
import apiHost from '../config';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInvites: [],
      groupMemberships: [],
      // acceptedGroupName: '',
    };
    // this.getGroups();
  }

  componentDidMount() {
    this.getGroups();
  }

  onUpdateInvitation = (incomingGroupInvite) => {
    // console.log(`Incoming Group : ${JSON.stringify(incomingGroupInvite)}`);
    // console.log('Reached in Parent onUpdate');
    let newGroupInvites = this.state.groupInvites;
    // console.log(`Before deleting: ${JSON.stringify(newGroupInvites)}`);
    // const deleteGroupInvite = newGroupInvites.find((groupInvite) => groupInvite.group_name === incomingGroupInvite.group_name);
    newGroupInvites = newGroupInvites.filter((gI) => gI.group_name !== incomingGroupInvite.group_name);
    incomingGroupInvite.is_member = 'Y';
    const newGroupMembers = [...this.state.groupMemberships, incomingGroupInvite];
    // const index = newGroupInvites.indexOf(deleteGroupInvite);
    // newGroupInvites.splice(index, 1);
    console.log(`After deleting: ${JSON.stringify(newGroupInvites)}`);
    this.setState({
      groupInvites: newGroupInvites,
      groupMemberships: newGroupMembers,
    });
    // console.log(`After deleting invite state: ${JSON.stringify(this.state.groupInvites)}`);
    // console.log(`After deleting member state: ${JSON.stringify(this.state.groupMemberships)}`);
  }

  // componentDidUpdate() {
  //   this.getGroups();
  // }

  getGroups = () => {
    // console.log('INside Get Groups');
    axios.get(`${apiHost}/api/getGroups/${localStorage.getItem('user_id')}`)
      .then((response) => {
        // console.log(response.data);
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

  // onAcceptInvite = () => {
  //   console.log('INside Accept Invite');
  //   console.log(`Groups: ${JSON.stringify(groupInvite)}`);
  //   const data = {
  //     user_id: localStorage.getItem('user_id'),
  //     group_name: groupInvite.group_ame,
  //   };
  //   axios.post(`${apiHost}/api/acceptInvite`, data)
  //     .then((response) => {
  //       console.log(`Data Message : ${response.data.message}`);
  //       // this.props.onAcceptInvite(this.state.group_name);
  //       this.setState({
  //         message: response.data.message,
  //         acceptedGroupName: groupInvite.group_ame,
  //       });
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    let errorMessage = null;
    // let groupInviteElements = null;
    // let groupMemberElements = null;
    if (this.state.message === 'NO_GROUPS') {
      errorMessage = <Alert variant="danger">You are not a part of any group. Create a New Group ! </Alert>;
    }

    // if (this.state.message === 'INVITE_ACCEPTED') {
    //   const newGroupInvites = this.state.groupInvites;
    //   const deleteGroupInvite = newGroupInvites.find((groupInvite) => groupInvite.group_name === this.state.acceptedGroupName);
    //   const index = newGroupInvites.indexOf(deleteGroupInvite);
    //   newGroupInvites.splice(index, 1);
    //   this.setState({
    //     groupInvites: newGroupInvites,
    //   });
    // }
    // console.log(`Length: ${this.state.groupInvites.length}`);
    // if (this.state.groupInvites.length > 0) {
    //   groupInviteElements = this.state.groupInvites.map((groupInvite) => (
    //     <GroupInvitation
    //       key={groupInvite}
    //       groupInvite={groupInvite}
    //       // onAcceptInvite={this.onAcceptInvite}
    //     />
    //   ));
    // }

    // if (this.state.groupMemberships.length > 0) {
    //   groupMemberElements = this.state.groupMemberships.map((groupMembership) => (
    //     <GroupMembership
    //       key={groupMembership}
    //       groupMembership={groupMembership}
    //       // onVisit={this.onVisit}
    //     />
    //   ));
    // }

    return (
      <div>
        <NavBar />
        {errorMessage}
        <div className="mt-5">
          <Row>
            <Col md={{ offset: 2, span: 8 }}>
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
          </Row>
          <Row>
            <Col md={{ offset: 2, span: 8 }}>
              <h3>Group Memberships</h3>
              <div className="my-5">
                <Container className="d-flex flex-wrap">
                  {this.state.groupMemberships.map((groupMembership) => (
                    <GroupMembership
                      key={groupMembership}
                      groupMembership={groupMembership}
                    />
                  ))}
                </Container>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Groups;
