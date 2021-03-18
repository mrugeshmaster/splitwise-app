import React, { Component } from 'react';
import {
  Modal, Button, Form, Row,
} from 'react-bootstrap';

class SettleUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleSave = () => {

  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row>
              Add an Expense
            </Row>
            <Row>
              With you and:
              &nbsp;
              {this.props.state.group_name}
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            name="billName"
            placeholder="Enter a description"
            onChange={this.onChange}
          />
          <Form.Control
            name="billAmount"
            type="text"
            placeholder="0.00"
            onChange={this.onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleSave}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettleUpModal;
