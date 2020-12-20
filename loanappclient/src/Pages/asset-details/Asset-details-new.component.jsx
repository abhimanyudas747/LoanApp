/* eslint eqeqeq: 0 */
import React from "react";
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { browserHistory } from "react-router";
import "./Asset-details-new.styles.css";

export const Typea = (props) => {
    var ann_inc = 0;
    var comp_bonds = 0;
    var debt_mutual_funds = 0;
    var equity_mutual_funds = 0;
    var other_mutual_funds = 0;
    var reason = "";
    var fd = 0;
    var td = 0;
    var ic = 0;
    var othercoll = "";
    const handleChange = (e) => {
        if (e.target.name == "ann_inc") {
            ann_inc = e.target.value;
        }
        if (e.target.name == "equity_mutual_funds") {
            equity_mutual_funds = e.target.value;
        }
        if (e.target.name == "debt_mutual_funds") {
            debt_mutual_funds = e.target.value;
        }
        if (e.target.name == "other_mutual_funds") {
            other_mutual_funds = e.target.value;
        }
        if (e.target.name == "fd") {
            fd = e.target.value;
        }
        if (e.target.name == "td") {
            td = e.target.value;
        }
        if (e.target.name == "ic") {
            ic = e.target.value;
        }
        if (e.target.name == "othercoll") {
            othercoll = e.target.value;
        }
    };

    const handleSubmit = async () => {
        await fetch(props.api + "/add_typea", {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "AppID=" +
                props.AppID +
                "&ann_inc=" +
                ann_inc +
                "&comp_bonds=" +
                comp_bonds +
                "&debt_mutual_funds=" +
                debt_mutual_funds +
                "&reason=" +
                reason +
                "&equity_mutual_funds=" +
                equity_mutual_funds +
                "&other_mutual_funds=" +
                other_mutual_funds,
        });

        browserHistory.push("/kyc");
    };

    return (
        <Container
            fluid
            style={{
                width: "60%",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
            }}
        >
            <Row>
                <Col className="title" sm={12}>
                    <h1>Provide Your Asset Details</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="inp" sm="12">
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Annual Income (Excluding Tax)
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="ann_inc"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <h1 style={{ fontSize: "23px" }}>Mutual Funds</h1>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Debt
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="debt_mutual_funds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Equity
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="equity_mutual_funds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Other
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="other_mutual_funds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <h1 style={{ fontSize: "23px" }}>Equity Share Holdings</h1>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Fixed Deposits
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="fd"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Insurance Contracts
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="ic"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Term Deposits
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="td"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Recurring Deposits
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="debt_mutual_funds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm={2}>
                                Other Collateral
              </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" name="othercoll" onChange={handleChange} rows="3" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row style={{ padding: "150px" }}>
                <Col sm={12}>
                    <Button variant="secondary">
                        <h1 style={{ fontSize: "23px" }}>Previous</h1>
                    </Button>
                    <Button style={{ float: "right" }} onClick={handleSubmit} variant="primary">
                        <h1 style={{ fontSize: "23px" }}>Next</h1>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export const Typeb = (props) => {
    var ann_inc = 0;
    var comp_bonds = 0;
    var debt_mutual_funds = 0;
    var reason = "";
    const handleChange = (e) => {
        if (e.target.name == "ann_inc") {
            ann_inc = e.target.value;
        }
        if (e.target.name == "comp_bonds") {
            comp_bonds = e.target.value;
        }
        if (e.target.name == "debt_mutual_funds") {
            debt_mutual_funds = e.target.value;
        }
        if (e.target.name == "reason") {
            reason = e.target.value;
        }
    };

    const handleSubmit = async () => {
        await fetch(props.api + "/add_typeb", {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "AppID=" +
                props.AppID +
                "&ann_inc=" +
                ann_inc +
                "&comp_bonds=" +
                comp_bonds +
                "&debt_mutual_funds=" +
                debt_mutual_funds +
                "&reason=" +
                reason,
        });

        browserHistory.push("/kyc");
    };

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                width: "60%",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
            }}
        >
            <Row>
                <Col className="title" sm={12}>
                    <h1>Provide Your Asset Details</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="inp" sm="12">
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Annual Income (Excluding Tax)
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="ann_inc"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Company Bonds
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="comp_bonds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Debt Mutual Funds
              </Form.Label>
                            <Col sm={10}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="inlineFormInputGroupUsername"
                                        name="debt_mutual_funds"
                                        onChange={handleChange}
                                        placeholder="Amount"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                            <Form.Label column sm={2}>
                                Reason
              </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" name="reason" onChange={handleChange} rows="3" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row style={{ padding: "150px" }}>
                <Col sm={12}>
                    <Button variant="secondary">
                        <h1 style={{ fontSize: "23px" }}>Previous</h1>
                    </Button>
                    <Button style={{ float: "right" }} onClick={handleSubmit} variant="primary">
                        <h1 style={{ fontSize: "23px" }}>Next</h1>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
