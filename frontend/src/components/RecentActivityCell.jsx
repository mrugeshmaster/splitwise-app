/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import '../App.css';

class RecentActivityCell extends Component {
  render() {
    const { activity } = this.props;
    console.log(activity.bill_created_at);
    return (
      <Row>
        <Col>
          <Row>
            <b>{activity.bill_paid_by === activity.user_id ? 'You' : `${activity.paid_by_name}` }</b>
            &nbsp;added&nbsp;
            <b>
              "
              {activity.bill_name}
              "
            </b>
            &nbsp;in&nbsp;
            <b>
              "
              {activity.group_name}
              "
            </b>
            .
          </Row>
          <Row
            className={activity.bill_paid_by === activity.user_id ? 'paid' : 'owe'}
          >
            {activity.bill_paid_by === activity.user_id ? 'You paid' : 'You owe' }
            &nbsp;
            {activity.split_amount}
          </Row>
          <Row>
            <Moment
              date={Date.UTC(activity.bill_created_at)}
              tz={localStorage.getItem('timezone')}
              className="billdate"
              format="dddd"
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default RecentActivityCell;
