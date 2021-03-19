/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Modal, Button, Form, Row,
} from 'react-bootstrap';
import axios from 'axios';
import apiHost from '../config';
import SearchBar from './SearchBar';

class SettleUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // keyword: '',
      names: this.props.payNames,
      // namesList: [],
      searchTerm: '',
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSave = () => {
    const data = {
      user_id: localStorage.getItem('user_id'),
      owedTo: this.state.owedTo,
      settleAmount: this.state.settleAmount,
    };
    axios.post(`${apiHost}/api/settle`, data)
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
  }

  editSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  dynamicSearch = () => this.state.names.filter((name) => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

  render() {
    // console.log(this.state.namesList);
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
              Settle Up
            </Row>
            <Row>
              You Paid:
              &nbsp;
              <Form.Control
                type="text"
                value={this.state.searchTerm}
                onChange={this.editSearchTerm}
              />
              <SearchBar names={this.dynamicSearch()} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            name="settleAmount"
            type="text"
            placeholder="0.00"
            onChange={this.onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onSave}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.onClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettleUpModal;
