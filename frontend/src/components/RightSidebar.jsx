/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import axios from 'axios';
import numeral from 'numeral';
import apiHost from '../config';

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notSettled: [],
      settled: [],
    };
    this.getUserGroupBalances();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.groupName !== prevState.groupName) {
      return {
        groupName: nextProps.groupName,
      };
    }
    return { groupName: '' };
  }

  getUserGroupBalances = async () => {
    await axios.get(`${apiHost}/api/getGroups/groupbalances/${this.props.groupName}`)
      .then((response) => {
        if (response.data[0]) {
          const list = response.data.filter((res) => {
            if (res.settled === 'N') {
              return res;
            }
          });
          const settledList = response.data.filter((res) => {
            // console.log(res);
            if (res.settled === 'Y') {
              return res;
            }
          });
          console.log(settledList);
          this.setState({
            notSettled: list,
            settled: settledList,
          });
        }
      }).catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  }

  render() {
    let errorMessage = null;

    if (this.state.message === 'NO_BILLS') {
      errorMessage = (
        <div className="font-weight-bold text-muted pt-5">Add bills to the group</div>
      );
    }

    // console.log(this.state.settled);
    // console.log(this.state.notSettled);
    let setSettledUsers = new Set();
    const settledElements = [];
    if (this.state && this.state.settled && this.state.settled.length > 0) {
      setSettledUsers = new Set(this.state.settled.map((obj) => obj.user1));
      setSettledUsers.forEach((key, value) => {
        settledElements.push(
          <Row className="paid pt-2">
            {value}
            &nbsp;
            <br />
            has settled up
          </Row>,
        );
      });
    }

    const collectElements = [];
    const payElements = [];

    if (this.state && this.state.notSettled && this.state.notSettled.length > 0) {
      // console.log(this.state.notSettled);
      let collect = new Map();
      let pay = new Map();
      for (let i = 0; i < this.state.notSettled.length; i += 1) {
        if (collect.get(this.state.notSettled[i].user1)) {
          collect.set(this.state.notSettled[i].user1, collect.get(this.state.notSettled[i].user1) + this.state.notSettled[i].amount);
        } else {
          collect.set(this.state.notSettled[i].user1, this.state.notSettled[i].amount);
        }
      }
      for (let i = 0; i < this.state.notSettled.length; i += 1) {
        if (pay.get(this.state.notSettled[i].user2)) {
          pay.set(this.state.notSettled[i].user2, pay.get(this.state.notSettled[i].user2) + this.state.notSettled[i].amount);
        } else {
          pay.set(this.state.notSettled[i].user2, this.state.notSettled[i].amount);
        }
      }

      // console.log(setSettledUsers);
      // console.log(settledElements);
      // console.log(collect);
      // console.log(pay);
      collect.forEach((key, value) => {
        collectElements.push(
          <Row className="paid pt-2">
            {value}
            &nbsp;
            <br />
            gets back
            &nbsp;
            {numeral(key).format('$0,0.00')}
          </Row>,
        );
      });

      pay.forEach((key, value) => {
        payElements.push(
          <Row className="owe pt-2">
            {value}
            &nbsp;
            <br />
            owes
            &nbsp;
            {numeral(key).format('$0.00')}
          </Row>,
        );
      });
    }

    return (
      <Container className="mt-5">
        <div className="pt-5 text-muted">Group Members</div>
        {errorMessage}
        <div className="pb-5" />
        {collectElements}
        <div className="p-5" />
        {payElements}
        <div className="p-5" />
        {!collectElements && !payElements && settledElements}
        {/* {settledElements} */}
      </Container>
    );
  }
}

export default RightSidebar;
