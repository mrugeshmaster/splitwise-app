/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import {
  Row, Col, ListGroup, Button,
} from 'react-bootstrap';
import NavBar from './NavBar';
import apiHost from '../config';
import GroupDetailsCell from './GroupDetailsCell';
import LeftSidebar from './LeftSidebar';
import ExpenseModal from './ExpenseModal';
// import SettleUpModal from './SettleUpModal';

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: this.props.location.state.group_name,
      groupDetails: [],
      showExpenseModal: false,
      // showSettleUpModal: false,
    };
    this.getGroupDetails();
  }

  componentDidMount() {
    this.getGroupDetails();
  }

  getGroupDetails = async () => {
    await axios.get(`${apiHost}/api/groupdetails/user_id/${localStorage.getItem('user_id')}/group_name/${this.props.location.state.group_name}`)
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            groupDetails: response.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  showExpenseModal = () => {
    this.setState({
      showExpenseModal: true,
    });
  }

  hideExpenseModal = () => {
    this.setState({
      showExpenseModal: false,
    });
    this.getGroupDetails();
  }

  render() {
    console.log('In render');
    console.log(`Group Details 0 :${JSON.stringify(this.state.groupDetails[0])}`);
    console.log(this.state.message);
    const groupElements = [];

    if (this.state && this.state.groupDetails && this.state.groupDetails.length > 0) {
      this.state.groupDetails.map((groupDetail) => {
        const groupElement = (
          <ListGroup.Item><GroupDetailsCell groupDetail={groupDetail} /></ListGroup.Item>
        );
        groupElements.push(groupElement);
      });
    }

    return (
      <div>
        <NavBar />
        <div>
          <Row className="mt-5">
            <Col md={{ span: 2, offset: 1 }}><LeftSidebar /></Col>
            <Col md={{ span: 6 }} className="mx-2">
              <Row>
                <h2>
                  {this.state.group_name}
                </h2>
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ExpenseModal
                    show={this.state.showExpenseModal}
                    handleClose={this.hideExpenseModal}
                    group_name={this.state.group_name}
                  />
                  <Button variant="success" onClick={this.showExpenseModal}>Add an Expense</Button>
                </Col>
              </Row>
              &nbsp;
              <Row>
                <ListGroup variant="flush" style={{ width: '100%' }}>
                  {groupElements}
                </ListGroup>
              </Row>
            </Col>
            <Col md={{ span: 2 }}>&nbsp;</Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default GroupDetails;
