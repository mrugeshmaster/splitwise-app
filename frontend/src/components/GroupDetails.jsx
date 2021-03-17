/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import {
  Row, Col, ListGroup, Container,
} from 'react-bootstrap';
import NavBar from './NavBar';
import apiHost from '../config';
import GroupDetailsEntry from './GroupDetailsEntry';
import LeftSidebar from './LeftSidebar';

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: this.props.location.state.group_name,
      groupDetails: [],
      // groupDetails: {
      //   billName: '',
      //   billAmount: '',
      //   billPayGet: '',
      //   splitAmount: '',
      //   billCreatedAt: '',
      // },
    };
  }

  componentDidMount() {
    this.getGroupDetails();
  }

  getGroupDetails = () => {
    console.log('here');
    console.log(`${apiHost}/api/groupdetails/user_id/${localStorage.getItem('user_id')}/group_name/${this.props.location.state.group_name}`);
    axios.get(`${apiHost}/api/groupdetails/user_id/${localStorage.getItem('user_id')}/group_name/${this.props.location.state.group_name}`)
      .then((response) => {
        // if (response.data && response.data.message !== 'SOMETHING_WENT_WRONG') {
        // response.data.map((res) => {
        // const groupDetail = {
        //   billName: res.bill_name,
        //   billAmount: res.bill_amount,
        //   billPayGet: res.pay_get,
        //   splitAmount: res.split_Amount,
        //   billCreatedAt: res.bill_created_at,
        // };
        // const list = [...this.state.groupDetails, groupDetail];
        if (response.data[0]) {
          this.setState({
            groupDetails: response.data,
          });
        }
        // });
        // }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('In render');
    console.log(this.state.groupDetails[0]);
    const groupElements = [];

    if (this.state && this.state.groupDetails && this.state.groupDetails.length > 0) {
      this.state.groupDetails.map((groupDetail) => {
        const groupElement = (
          <ListGroup.Item><GroupDetailsEntry groupDetail={groupDetail} /></ListGroup.Item>
        );
        groupElements.push(groupElement);
      });
    }

    return (
      <div>
        <NavBar />
        <div>
          <Container fluid className="mt-5">
            <Row>
              <Col md={{ span: 2, offset: 1 }}><LeftSidebar /></Col>
              <Col md={{ span: 6 }} className="mx-2">
                <Row>
                  <h4>
                    {this.state.group_name}
                  </h4>
                </Row>
                <Row>
                  <ListGroup variant="flush" style={{ width: '100%' }}>
                    {groupElements}
                  </ListGroup>
                </Row>
              </Col>
              <Col md={{ span: 2 }}>&nbsp;</Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default GroupDetails;
