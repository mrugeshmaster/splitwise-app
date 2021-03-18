/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import LeftSidebar from './LeftSidebar';
import apiHost from '../config';
import RecentActivityCell from './RecentActivityCell';
import RightSidebar from './RightSidebar';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRecentActivity();
  }

  getRecentActivity = () => {
    axios.get(`${apiHost}/api/recentactivity/${localStorage.getItem('user_id')}`)
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            activities: response.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.activity);
    const activityElements = [];
    if (this.state
      && this.state.activities
      && this.state.activities.length > 0) {
      this.state.activities.map((activity) => {
        activityElements.push(
          <ListGroup.Item><RecentActivityCell activity={activity} /></ListGroup.Item>,
        );
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
              <h2>Recent Activity</h2>
            </Row>
            <ListGroup variant="flush" style={{ width: '100%' }}>
              {activityElements}
            </ListGroup>
          </Col>
          <Col>
            <RightSidebar />
          </Col>
        </Row>
      </div>
    );
  }
}
export default RecentActivity;
