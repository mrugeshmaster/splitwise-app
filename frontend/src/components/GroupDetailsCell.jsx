import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import '../App.css';
import numeral from 'numeral';

class GroupDetailsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // groupDetail: this.props.groupDetail,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.groupDetail !== prevState.groupDetail) {
  //     return {
  //       groupDetail: nextProps.groupDetail,
  //     };
  //   }
  //   return { groupDetail: null };
  // }

  render() {
    console.log('Inside group details cell');
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
              <Row>{numeral(groupDetail.bill_amount).format('$0,0.00')}</Row>
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
              <Row className={groupDetail.bill_paid_by === groupDetail.user_id ? 'paid' : 'owe'}>{numeral(groupDetail.split_amount).format('$0,0.00')}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default GroupDetailsCell;
