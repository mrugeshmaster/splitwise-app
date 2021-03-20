/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Row, Col, Button, ListGroup,
} from 'react-bootstrap';
import { Divider } from '@material-ui/core';
import axios from 'axios';
import numeral from 'numeral';
import apiHost from '../config';
import LeftSidebar from './LeftSidebar';
import NavBar from './NavBar';
import SettleUpModal from './SettleUpModal';
import '../App.css';
import BalanceCell from './BalanceCell';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showSettleUpModal: false,
      collectBalances: [],
      payBalances: [],
    };
    this.getBalances();
    document.title = 'Splitwise';
  }

  onShowSettleUpModal = () => {
    this.setState({
      showSettleUpModal: true,
    });
  }

  onHideSettleUpModal = () => {
    this.setState({
      showSettleUpModal: false,
      collectBalances: [],
      payBalances: [],
    });
    this.getBalances();
  }

  getBalances = async () => {
    await axios.get(`${apiHost}/api/balances/${localStorage.getItem('user_id')}`)
      .then((response) => {
        if (response.data.message.length > 0) {
          response.data.message.map((balance) => {
            if (balance.collect_or_pay === 'COLLECT') {
              this.setState((prevState) => ({
                collectBalances: [...prevState.collectBalances, balance],
              }));
            } else if (balance.collect_or_pay === 'PAY') {
              this.setState((prevState) => ({
                payBalances: [...prevState.payBalances, balance],
              }));
            }
          });
        }
      }).catch((err) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          message: err.response.data.message,
        });
      });
  }

  render() {
    let collectBalance = 0;
    let payBalance = 0;
    const payNames = [];
    const payItems = [];
    const collectItems = [];

    if (this.state.collectBalances && this.state.collectBalances.length > 0) {
      collectBalance = this.state.collectBalances.map((collectBal) => collectBal.net_amt).reduce((a, b) => a + b);

      this.state.collectBalances.map((collectBal) => {
        collectItems.push(
          <BalanceCell balanceItem={collectBal} />,
        );
      });
    }

    if (this.state.payBalances && this.state.payBalances.length > 0) {
      payBalance = this.state.payBalances.map((payBal) => payBal.net_amt).reduce((a, b) => a + b);

      this.state.payBalances.map((payBal) => {
        // console.log(payBal);
        payItems.push(
          <BalanceCell balanceItem={payBal} />,
        );
        payNames.push(payBal.user2_name);
      });
    }
    // console.log(`PayNames ${payNames}`);
    return (
      <div>
        <NavBar />
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <LeftSidebar />
          </Col>
          <Col md={{ span: 6 }} className="mx-2">
            <Row>
              <h2>
                Dashboard
              </h2>
              <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SettleUpModal
                  show={this.state.showSettleUpModal}
                  onClose={this.onHideSettleUpModal}
                  payNames={payNames}
                />
                <Button variant="success" onClick={this.onShowSettleUpModal}>Settle Up</Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <ListGroup horizontal style={{ width: '100%' }}>
                <ListGroup.Item as={Col}>
                  <Row className="balanceItem">
                    Total Balance
                  </Row>
                  <Row className="balanceItem">{numeral(collectBalance - payBalance).format('$0,0.00')}</Row>
                </ListGroup.Item>
                <ListGroup.Item as={Col}>
                  <Row className="balanceItem">you owe</Row>
                  <Row className="balanceItem">{numeral(payBalance).format('$0,0.00')}</Row>
                </ListGroup.Item>
                <ListGroup.Item as={Col}>
                  <Row className="balanceItem">you are owed</Row>
                  <Row className="balanceItem">{numeral(collectBalance).format('$0,0.00')}</Row>
                </ListGroup.Item>
              </ListGroup>
            </Row>
            <Row className="mt-3">
              <Col>
                <h4 className="text-muted">You Owe</h4>
                <ListGroup variant="flush">
                  {payItems.length > 0 ? payItems : <div className="mt-2 text-muted d-flex">You are settled</div> }
                </ListGroup>
              </Col>
              <Divider orientation="vertical" flexItem />
              <Col>
                <Row className="mr-1" style={{ display: 'flex', justifyContent: 'flex-end' }}><h4 className="text-muted">You are Owed</h4></Row>
                <ListGroup variant="flush">
                  {collectItems.length > 0 ? collectItems : <div className="mt-2 pr-0 text-muted d-flex justify-content-end">You are settled</div> }
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
