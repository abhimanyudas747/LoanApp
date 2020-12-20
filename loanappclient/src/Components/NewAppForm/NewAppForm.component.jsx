/* eslint eqeqeq: 0 */
import React from 'react'
import { Modal, Button, Col, Form, Alert, InputGroup, FormControl } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class NewAppForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Loanamt: "",
            UID: props.user,
            Status: "",
            fail: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleClose = () => {
        this.props.close()
    }

    handleSubmit = () => {
        this.setState({
            Status: "Filed"
        })

        fetch(this.props.api + '/new_app', {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "UID=" + this.state.UID + "&Loanamt=" + this.state.Loanamt + "&Status=Filed"
        })
            .then(response => response.json())
            .then(data => {
                if (data['Status'] == "OK") {
                    this.handleClose()
                    this.props.refresh()
                }
                else {
                    this.setState({
                        fail: true
                    })
                }

            }
            )
    }

    handleChange = (e) => {
        this.setState({
            Loanamt: e.target.value
        })
        console.log(this.state)
    }




    render() {

        if (this.props.token === "") {
            browserHistory.push("/")
        }
        return (


            <Modal show={this.props.show} onHide={this.handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for Loan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert hidden={!this.state.fail} key="0" variant="danger">Failed To Submit</Alert>
                    <Form>
                        <Form.Row>
                            <Col sm="12">
                                <Form.Label column>
                                    <h2>Loan Amount:</h2>
                                </Form.Label>

                            </Col>

                            <Col sm="12">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>₹</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Amount" value={this.state.Loanamt} onChange={this.handleChange} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>.00</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>


                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit Application
                </Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default NewAppForm;