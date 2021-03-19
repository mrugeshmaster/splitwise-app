/* eslint-disable prefer-const */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import axios from 'axios';
import apiHost from '../config';

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // settled: [],
      notSettled: [],
    };
    this.getUserGroupBalances();
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
          this.setState({
            notSettled: list,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log('Balances');
    console.log(this.state.notSettled);
    const collectElements = [];
    const payElements = [];
    if (this.state && this.state.notSettled && this.state.notSettled.length > 0) {
      // this.state.notSettled.map((n) => (return({ user1:})));
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
      collect.forEach((key, value) => {
        collectElements.push(
          <Row className="paid pt-2">
            {value}
            &nbsp;
            <br />
            gets back $
            {key}
          </Row>,
        );
      });
      pay.forEach((key, value) => {
        payElements.push(
          <Row className="owe pt-2">
            {value}
            &nbsp;
            <br />
            owes $
            {key}
          </Row>,
        );
      });
    }
    return (
      <Container className="mt-5">
        <div className="pt-5 text-muted">Group Members</div>
        <div className="pb-5" />
        {collectElements}
        <div className="p-5" />
        {payElements}
      </Container>
    );
  }
}

export default RightSidebar;
