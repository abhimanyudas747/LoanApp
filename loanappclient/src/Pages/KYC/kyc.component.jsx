/* eslint eqeqeq: 0 */
import React from 'react'
import { Container, Alert, Row, Col, Form, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import './kyc.styles.css'
import VerifyAadhar from './verifyaadhar.component'

class Kyc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aadhaar: "",
            pan: "",
            passport: "",
            isadharverified: false,
            name: "",
            addrline1: "",
            addrline2: "",
            city: "",
            district: "",
            state: "",
            PIN: "",
            dob: "",
            caddrline1: "",
            caddrline2: "",
            ccity: "",
            cdistrict: "",
            cstate: "",
            cPIN: "",
            fetched: false,
            showmodal: false
        }

        //fetch account details

        this.handleChange = this.handleChange.bind(this);
        this.verifypassport = this.verifypassport.bind(this);
        this.verifyaadhaar = this.verifyaadhaar.bind(this);
        this.closemodal = this.closemodal.bind(this);
        this.aadharverified = this.aadharverified.bind(this);
        this.verifypan = this.verifypan.bind(this);
        this.savedetails = this.savedetails.bind(this);
        this.fetchdetails = this.fetchdetails.bind(this);
    }

    fetchdetails = () => {

        fetch('https://randomuser.me/api/').then(response => response.json()).then(data => data['results'][0]).then(resp =>
            this.setState({
                name: this.props.fname + " " + this.props.lname,
                addrline1: resp.location.street.number + ", " + resp.location.street.name,
                city: resp.location.city,
                district: "Example District",
                state: resp.location.state,
                PIN: resp.location.postcode,
                dob: resp.dob.date.slice(0, 10),
                caddrline1: resp.location.street.number + ", " + resp.location.street.name,
                ccity: resp.location.city,
                cdistrict: "Example District",
                cstate: resp.location.state,
                cPIN: resp.location.postcode



            })

        )


    }

    savedetails = async () => {
        //save to db
        const data = new FormData();
        data.append('AppID', this.props.AppID)
        data.append('name', this.state.name)
        data.append('addrline1', this.state.addrline1)
        data.append('addrline2', this.state.addrline2)
        data.append('city', this.state.city)
        data.append('district', this.state.district)
        data.append('state', this.state.state)
        data.append('PIN', this.state.PIN)
        data.append('caddrline1', this.state.caddrline1)
        data.append('caddrline2', this.state.caddrline2)
        data.append('ccity', this.state.ccity)
        data.append('cdistrict', this.state.cdistrict)
        data.append('cstate', this.state.cstate)
        data.append('cPIN', this.state.cPIN)
        await fetch(this.props.api + '/add_kyc', {
            method: 'post',
            body: data
        })
        //push(summary) if aadharverified else push(documentupload)
        if (this.state.isadharverified == true) {
            browserHistory.push('/summary');
            this.props.setverified();

        }
        else {
            browserHistory.push('/docupl')
        }
    }


    verifypan = (e) => {
        e.preventDefault();
        this.setState({
            fetched: true
        })
        this.fetchdetails();

        //fetch aadhaar details and verify
        document.getElementById('cont').style.height = "100%"
    }

    aadharverified = () => {
        this.setState({
            isadharverified: true,
            fetched: true
        })
        this.closemodal()
        this.fetchdetails();
        //fetch aadhaar details and verify
        document.getElementById('cont').style.height = "100%"
    }

    verifyaadhaar = (e) => {
        e.preventDefault();
        this.setState({
            showmodal: true
        })

    }

    closemodal = () => {
        this.setState({
            showmodal: false
        })
    }

    verifypassport = (e) => {
        e.preventDefault()
        this.setState({
            fetched: true
        })
        this.fetchdetails();
        //fetch passport details and verify

        document.getElementById('cont').style.height = "100%"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {



        return (
            <>

                <VerifyAadhar showmodal={this.state.showmodal} verified={this.aadharverified} closemodal={this.closemodal} />
                <Container id="cont" fluid style={{ height: "100vh", width: "80%", backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)" }}>
                    <Row className="justify-content-md-center">
                        <Col style={{ paddingTop: "55px", textAlign: "center" }} sm="12">
                            <h1>KYC Verification</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "center" }} sm={12}>
                            <Alert variant="warning">
                                DISCLAIMER: Customers can verify themselves using Aadhaar, PAN or Passport number. Using Aadhaar is recommended for easy verification. *PAN is mandatory for verification.
                </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="centeredcol" sm={12}>
                            <Form>
                                <Form.Row className="align-items-center">
                                    <Col xs="auto">

                                        <Form.Control
                                            className="mb-2"
                                            id="inlineFormInput"
                                            placeholder="Aadhaar UID"
                                            name="aadhaar"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>


                                    <Col xs="auto">
                                        <Button type="submit" onClick={this.verifyaadhaar} className="mb-2">
                                            Verify
                    </Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                        <Col className="centeredcol" sm={12}>
                            <Form>
                                <Form.Row className="align-items-center">
                                    <Col xs="auto">

                                        <Form.Control
                                            className="mb-2"
                                            id="inlineFormInput"
                                            placeholder="PAN"
                                            name="pan"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>


                                    <Col xs="auto">
                                        <Button type="submit" onClick={this.verifypan} className="mb-2">
                                            Verify
                    </Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                        <Col className="centeredcol" sm={12}>
                            <Form>
                                <Form.Row className="align-items-center">
                                    <Col xs="auto">

                                        <Form.Control
                                            className="mb-2"
                                            id="inlineFormInput"
                                            placeholder="Passport Number"
                                            name="passport"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>


                                    <Col xs="auto">
                                        <Button type="submit" onClick={this.verifypassport} className="mb-2">
                                            Verify
                    </Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>

                    <Row hidden={!this.state.fetched}>
                        <Col style={{ paddingTop: "55px", textAlign: "center" }} sm="12">
                            <h1>Details</h1>
                        </Col>
                        <Col sm="12" style={{ textAlign: "center" }}>
                            <Alert variant="warning">
                                DISCLAIMER: In case correspondence address is different than permanent address, customer has to upload supporting documents on the next page.
                </Alert>
                        </Col>
                        <Col sm={12}>
                            <Form>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Name
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.name} disabled />
                                    </Col>
                                </Form.Group>

                                <h3>Permanent Address</h3>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Address Line 1
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.addrline1} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Address Line 2
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.addrline2} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        City
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.city} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        District
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.district} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        State
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.state} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        PIN
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.PIN} disabled />
                                    </Col>
                                </Form.Group>

                                <h3>Correspondence Address</h3>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Address Line 1
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control value={this.state.caddrline1} type="text" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Address Line 2
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.caddrline2} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        City
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.ccity} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        District
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.cdistrict} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        State
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.cstate} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        PIN
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.cPIN} />
                                    </Col>
                                </Form.Group>
                                <hr />
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        DOB
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={this.state.dob} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Phone
                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" />
                                    </Col>
                                </Form.Group>

                                <Col sm="12" style={{ textAlign: "center" }}>
                                    <Alert variant="warning">
                                        DISCLAIMER: All fields may not populate automatically if PAN/Passport is used for verification. Please fill them manually.
                </Alert>
                                </Col>




                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button type="button" onClick={this.savedetails}>NEXT</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}


export default Kyc;
