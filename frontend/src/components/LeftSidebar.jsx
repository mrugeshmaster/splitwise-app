/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiHost from '../config';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getGroupList();
  }

  getGroupList = () => {
    axios.get(`${apiHost}/api/getGroups/grouplist/${localStorage.getItem('user_id')}`)
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            groupList: response.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const groupLinks = [];
    if (this.state && this.state.groupList && this.state.groupList.length > 0) {
      this.state.groupList.map((group) => {
        groupLinks.push(
          <Link
            key={group.group_name}
            className="nav-link"
            to={{
              pathname: '/groupdetails',
              state: { group_name: group.group_name },
            }}
          >
            {group.group_name}
          </Link>,
        );
      });
    }
    return (
      <Nav defaultActiveKey="/home" className="flex-column mt-3">
        <Nav.Link href="/home">Dashboard</Nav.Link>
        <Nav.Link href="/groups">My Groups</Nav.Link>
        <Nav.Link href="/recentactivity">Recent Activity</Nav.Link>
        <hr />
        <div className="px-3 text-muted">Groups</div>
        {groupLinks}
      </Nav>
    );
  }
}

export default LeftSidebar;
