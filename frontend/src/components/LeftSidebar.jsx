/* eslint-disable array-callback-return */
/* eslint-disable max-len */
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
    console.log(this.state.group_name);
    console.log(this.state.groupList);
    const groupLinks = [];
    if (this.state && this.state.groupList && this.state.groupList.length > 0) {
      this.state.groupList.map((group) => {
        console.log(`State name: ${this.state.group_name}`);
        console.log(`Group Name: ${group.group_name}`);
        console.log(this.state.group_name === group.group_name);
        groupLinks.push(
          <Link
            class="nav-link"
            onClick={() => { this.setState({ group_name: group.group_name }); }}
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
        <Nav.Link eventKey="/recentactivity">Recent Activity</Nav.Link>
        <hr />
        <div className="px-3 text-muted">Groups</div>
        {groupLinks}
        {/* {this.state && this.state.groupList && this.state.groupList.length > 0 && this.state.groupList.map((group) => {
          <Nav.Link href="/groupdetails">{group.group_name}</Nav.Link>;
        })} */}
      </Nav>
    );
  }
}

export default LeftSidebar;
