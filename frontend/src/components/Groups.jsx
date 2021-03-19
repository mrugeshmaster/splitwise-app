/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { Component } from 'react';
import {
  Alert, Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import NavBar from './NavBar';
import apiHost from '../config';
import GroupInvitation from './GroupInvitation';
import GroupMembership from './GroupMembership';
import LeftSidebar from './LeftSidebar';
import SearchBar from './SearchBar';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupInvites: [],
      groupMemberships: [],
      groupSearchName: '',
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  onUpdateInvitation = () => {
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
            const list = [...this.state.groupMemberships, res];
            this.setState({
              groupMemberships: list,
            });
          } else if (res.is_member === 'N') {
            const list = [...this.state.groupInvites, res];
            this.setState({ groupInvites: list });
          }
        });
      }).catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  }

  onSearchName = async (groupName) => {
    this.setState({
      groupSearchName: groupName,
    });
  }

  render() {
    console.log(`render groupsearch : ${JSON.stringify(this.state.groupSearch)}`);
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
              <Row>
                <Col md={6} className="pr-2">
                  <SearchBar
                    names={this.state.groupMemberships.map((groupMembership) => groupMembership.group_name)}
                    onSearchName={this.onSearchName}
                    onUpdateInvitation={this.onUpdateInvitation}
                  />
                </Col>
                <Col md={1} className="p-0">
                  <Link
                    variant="btn-info"
                    to={{
                      pathname: '/groupdetails',
                      state: { group_name: this.state.groupSearchName },
                    }}
                  >
                    <ArrowRightSquareFill size="38px" />
                  </Link>
                </Col>
              </Row>
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
