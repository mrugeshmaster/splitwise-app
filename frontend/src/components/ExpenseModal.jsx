import axios from 'axios';
import React, { Component } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import apiHost from '../config';

class ExpenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSave = () => {
    const data = {
      group_name: this.props.group_name,
      bill_paid_by: localStorage.getItem('user_id'),
      bill_name: this.state.bill_name,
      bill_amount: this.state.bill_amount,
    };

    axios.post(`${apiHost}/api/addbill`, data)
      .then((response) => {
        if (response.data.message === 'BILL_ADDED') {
          // this.setState({
          //   message: response.data.message,
          // });
          this.props.handleClose();
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
              <Col>Add an Expense</Col>
            </Row>
            <Row>
              <Col>
                With you and:
                &nbsp;
                {this.props.group_name}
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col}>
            <Form.Control
              type="text"
              name="bill_name"
              placeholder="Enter a description"
              onChange={this.onChange}
            />
            &nbsp;
            <Form.Control
              name="bill_amount"
              type="text"
              placeholder="0.00"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Label className="ml-4">Paid by you and split equally</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ExpenseModal;
