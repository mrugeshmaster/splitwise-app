import React, { Component } from 'react';
import { ListGroup, Row } from 'react-bootstrap';

class BalanceCell extends Component {
  render() {
    const { balanceItem } = this.props;
    console.log(balanceItem);
    return (
      <ListGroup.Item>
        <Row>
          {balanceItem.user2_name}
        </Row>
        <Row className={balanceItem.collect_or_pay === 'COLLECT' ? 'paid' : 'owe'}>
          {balanceItem.collect_or_pay === 'COLLECT' ? 'owes you' : 'you owe'}
          &nbsp;
          {Math.abs(balanceItem.net_amt)}
        </Row>
      </ListGroup.Item>
    );
  }
}
export default BalanceCell;
