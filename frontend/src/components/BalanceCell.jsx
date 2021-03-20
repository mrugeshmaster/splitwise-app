import React, { Component } from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import numeral from 'numeral';

class BalanceCell extends Component {
  render() {
    const { balanceItem } = this.props;
    // console.log(balanceItem);
    return (
      <ListGroup.Item>
        <Row>
          {balanceItem.user2_name}
        </Row>
        <Row className={balanceItem.collect_or_pay === 'COLLECT' ? 'paid' : 'owe'}>
          {balanceItem.collect_or_pay === 'COLLECT' ? 'owes you' : 'you owe'}
          &nbsp;
          {numeral(Math.abs(balanceItem.net_amt)).format('$0,0.00')}
        </Row>
      </ListGroup.Item>
    );
  }
}
export default BalanceCell;
