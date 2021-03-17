import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

class GroupDetailsEntry extends Component {
  render() {
    const { groupDetail } = this.props;
    return (
      <Row>
        <Col md={2}><Moment format="MMM YYYY">{groupDetail.bill_created_at}</Moment></Col>
        <Col md={6}>{groupDetail.bill_name}</Col>
        <Col md={2}>
          <Row>
            <Col>
              <Row style={{ fontSize: '12px', color: 'grey' }}>
                {groupDetail.paid_by_name}
                {' '}
                paid
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
                  <p>
                    you lent
                  </p>
                ) : (
                  <p>
                    {groupDetail.paid_by_name}
                    {' '}
                    lent you
                  </p>
                ) }
              </Row>
              <Row>{groupDetail.split_amount}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default GroupDetailsEntry;
