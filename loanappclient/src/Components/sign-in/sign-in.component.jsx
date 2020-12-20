/* eslint eqeqeq: 0 */
import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Alert } from "react-bootstrap";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      uid: "",
      password: "",
      fail: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ show: props.show });
  }

  handleClose = () => {
    console.log(this.props);
    this.setState({
      show: false,
    });
    this.props.closemodal();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    console.log(this.props.api + "/signin");
    fetch(this.props.api + "/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "uid=" + this.state.uid + "&password=" + this.state.password,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["Status"] == "OK") {
          this.props.setToken("Token" + data["Token"]);
          this.props.setUser(data["user"]);
          this.handleClose();
          this.props.refresh();
        } else {
          this.setState({
            fail: true,
          });
        }
      });
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="sign-in-from">
          <center>Sign In To Your Account</center>
          <hr />
          <Alert hidden={!this.state.fail} key="0" variant="danger">
            Login failed.
          </Alert>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="3" style={{ color: "#000000" }}>
              UID
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" name="uid" onChange={this.handleChange} placeholder="UID" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="3" style={{ color: "#000000" }}>
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Signin;
