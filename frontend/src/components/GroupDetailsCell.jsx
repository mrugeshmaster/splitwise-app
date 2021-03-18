import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import '../App.css';

class GroupDetailsCell extends Component {
  render() {
    const { groupDetail } = this.props;
    return (
      <Row>
        <Col md={2}><Moment tz={localStorage.getItem('timezone')} className="billdate" format="MMM DD">{groupDetail.bill_created_at}</Moment></Col>
        <Col md={6}>{groupDetail.bill_name}</Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                { groupDetail.bill_paid_by === groupDetail.user_id ? (
                  'you paid'
                ) : (
                  `${groupDetail.paid_by_name} paid`
                ) }
              </Row>
              <Row>{groupDetail.bill_amount}</Row>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                { groupDetail.bill_paid_by === groupDetail.user_id ? (
                  'you lent'
                ) : (
                  `${groupDetail.paid_by_name} lent you`
                ) }
              </Row>
              <Row className={groupDetail.bill_paid_by === groupDetail.user_id ? 'paid' : 'owe'}>{groupDetail.split_amount}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default GroupDetailsCell;
