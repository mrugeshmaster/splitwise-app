/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Row, Col, ListGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import LeftSidebar from './LeftSidebar';
import apiHost from '../config';
import RecentActivityCell from './RecentActivityCell';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      groupList: [],
      order: 'NEWEST',
    };
    this.getRecentActivity();
    this.getGroups();
  }

  getRecentActivity = async () => {
    axios.get(`${apiHost}/api/recentactivity/${localStorage.getItem('user_id')}`)
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            activities: response.data,
            filteractivites: response.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  getGroups = async () => {
    await axios.get(`${apiHost}/api/getGroups/${localStorage.getItem('user_id')}`)
      .then((response) => {
        response.data.map((res) => {
          if (res.is_member === 'Y') {
            const list = [...this.state.groupList, res];
            this.setState({
              groupList: list,
            });
          }
        });
      }).catch((err) => {
        console.log(err.response.data);
      });
  }

  onSort=(e) => {
    if (this.state.order === 'NEWEST' && e.target.value === 'OLDEST') {
      this.setState({
        activities: this.state.activities.reverse(),
        order: 'OLDEST',
      });
    } else if (this.state.order === 'OLDEST' && e.target.value === 'NEWEST') {
      this.setState({
        activities: this.state.activities.reverse(),
        order: 'NEWEST',
      });
    }
  }

  onFilter=(e) => {
    if (e.target.value === 'ALL_GROUPS') {
      this.setState({
        filteractivites: [],
      });
      this.getRecentActivity();
    } else {
      const filterActivities = this.state.activities.filter((activity) => activity.group_name === e.target.value);
      console.log(filterActivities);
      this.setState({
        filteractivites: filterActivities,
      });
    }
  }

  render() {
    const activityElements = [];
    const groupFilter = new Set();
    groupFilter.add(<Dropdown.Item as="button" value="ALL_GROUPS" onClick={this.onFilter}>All Groups</Dropdown.Item>);
    if (this.state
      && this.state.filteractivites
      && this.state.filteractivites.length > 0) {
      this.state.filteractivites.map((activity) => {
        activityElements.push(
          <ListGroup.Item><RecentActivityCell activity={activity} /></ListGroup.Item>,
        );
      });
    }

    if (this.state && this.state.groupList && this.state.groupList.length > 0) {
      this.state.groupList.map((group) => {
        const groupName = (
          <Dropdown.Item as="button" value={group.group_name} onClick={this.onFilter}>{group.group_name}</Dropdown.Item>
        );
        groupFilter.add(groupName);
      });
    }

    return (
      <div>
        <NavBar />
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <LeftSidebar />
          </Col>
          <Col md={{ span: 6 }}>
            <Row>
              <Col>
                <h2>Recent Activity</h2>
              </Col>
              <Col className="p-0" md={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DropdownButton
                  variant="info"
                  menuAlign="right"
                  title="Filter"
                  id="dropdown-menu-align-right"
                >
                  {groupFilter}
                </DropdownButton>
              </Col>
              <Col className="pl-1 pr-0" md={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DropdownButton
                  variant="info"
                  menuAlign="right"
                  title="Sort"
                  id="dropdown-menu-align-right"
                >
                  <Dropdown.Item as="button" value="NEWEST" onClick={this.onSort}>Newest</Dropdown.Item>
                  <Dropdown.Item as="button" value="OLDEST" onClick={this.onSort}>Oldest</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <ListGroup variant="flush" style={{ width: '100%' }}>
              {/* {activityElements} */}
              {activityElements.length > 0 ? activityElements : <h3 className="mt-3 text-muted">No Recent Activity</h3>}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
export default RecentActivity;
