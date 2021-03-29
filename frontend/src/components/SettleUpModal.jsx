/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import apiHost from '../config';
import SearchBar from './SearchBar';

class SettleUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    document.title = 'Splitwise';
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSearchName = (name) => {
    this.setState({
      owedTo: name,
    });
  }

  onSave = () => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      owedTo: this.state.owedTo,
      settleAmount: this.state.settleAmount,
    };
    console.log(data);
    axios.post(`${apiHost}/api/settle`, data)
      .then((response) => {
        if (response.data.message === 'BALANCE_SETTLED') {
          this.props.onClose();
        }
      }).catch((err) => {
        console.log(err.response.data);
      });
  }

  render() {
    console.log(`Props: ${this.props.payNames}`);
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
              Settle Up
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={{ span: 3 }}>
              You Paid:
            </Col>
            <Col>
              <SearchBar as="input" names={this.props.payNames} onSearchName={this.onSearchName} />
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col>
              <Form.Control
                name="settleAmount"
                type="text"
                placeholder="$0.00"
                onChange={this.onChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.onSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettleUpModal;
