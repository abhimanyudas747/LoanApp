import React from 'react'
import {Container, Spinner, Alert, Nav, NavDropdown, Row, Col, Form, Button, Table, DropdownButton, Dropdown} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import './summary.style.css'



class Summary extends React.Component{
    constructor(props){
        super(props)

        this.typeconv = {
            'PLoan': 'Personal',
            'VH': 'Vehicle',
            'HB': 'House',
            'TERM': 'Term'
        }
        this.freqconv = {
            '1': 'Monthly',
            '4': 'Quartlery',
            '6': 'Half Yearly',
            '12': 'Yearly'
        }
        this.kyclableconv = {
            'name': "Name:",
            'addrline1': "Address Line 1:",
            'addrline2': "Address Line 2:",
            'city': "City:",
            'district': "District:",
            'state': "State:",
            'PIN': "PIN:",
            'dob': "Date of Birth:",
            'caddrline1': "Address Line 1:",
            'caddrline2': "Address Line 2:",
            'ccity': "City:",
            'cdistrict': "District:",
            'cstate': "State:",
            'cPIN': "PIN:",
        }
        this.state = {
            record: "",
            kycinfo : "",
            docs : "",
            docfetched: false,
            photo: "",
            cnfrm : false
        }

        


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.addrproof = ""
        this.photo = ""




    }

    handleChange = (e) => {
        this.setState({
            cnfrm: !this.state.cnfrm
        })
    }

    componentDidMount(){
        fetch(this.props.api+'/get_app?AppID='+this.props.AppID)
        .then(response => response.json())
        .then(data => this.setState({
           record: data['Record'][0]}))
        fetch(this.props.api+'/get_kycinfo?AppID='+this.props.AppID)
        .then(response => response.json())
        .then(data => this.setState({
            kycinfo: data}))
            
        fetch(this.props.api+'/get_docs?AppID='+this.props.AppID)
        .then(response => response.json())
        .then(data => this.setState({
            docs: data,
            docfetched: true}))
        

        // .then( () => {
        //     import (`D:/Projects/PycharmProjects/loanapp/loanapp/media/${this.state.docs.addr}`)
        //     .then(image => this.setState({
        //         addr: image
        //     }))

        //     import ("D:/Projects/PycharmProjects/loanapp/loanapp/media/"+this.state.docs.photo)
        //     .then(image => this.setState({
        //         photo: image
        //     }))

            
        
        //     }

        // )
        
        console.log("mounted")

    }


    handleSubmit = async(e) => {
        e.preventDefault()
        if(!this.state.cnfrm){
            alert("Please accept terms and conditons")
            return
        }
        console.log(this.state)
        await fetch(this.props.api+'/update_app', {
                                                        method: 'post',
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded",
                                                        },
                                                        body: "AppID="+this.state.record.AppID+"&newStatus=Filed"
                                                    })
        browserHistory.push("/dashboard")

    }


    render()
    {
        let addr =  <Spinner animation="border" />
        let photo = <Spinner animation="border" />
        if (this.state.docs !== "" || this.state.docs.Status === "OK"){
            addr = <img src={this.props.api+"/media/"+this.state.docs.addr} width="223" height="223" />
            photo = <img src={this.props.api+"/media/"+this.state.docs.photo} width="223" height="223" />
               
         }
         
        return (
            <>
            <Container fluid style={{paddingBottom: "50px", height: "100%", width: "80%", backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
                <Row className="justify-content-md-center">
                    <Col style={{paddingTop: "55px", textAlign: "center"}} sm="12">
                        <h1>Summary</h1> 
                    </Col>

                </Row>
                <Row className="summarypage">
                    <Form>
                    <Form.Group as={Row} controlId="summarygroup1">
                        <Form.Label column sm="2">
                        Application ID:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.state.record.AppID} />
                        </Col>
                        <Form.Label column sm="2">
                        Type:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.typeconv[this.state.record.Type]} />
                        </Col>
                        <Form.Label column sm="2">
                        Amount:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.state.record.Loanamt+" Lacs"} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="summarygroup2">
                        <Form.Label column sm="2">
                        Duration:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.state.record.Duration+" Months"} />
                        </Col>
                        <Form.Label column sm="2">
                        Installment:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.freqconv[this.state.record.Frequency]} />
                        </Col>
                        <Form.Label column sm="2">
                        Installment Amount:
                        </Form.Label>
                        <Col sm="2">
                        <Form.Control plaintext readOnly value={this.state.record.Installment+" Lacs"} />
                        </Col>
                    </Form.Group>
                    <br></br>
                    <h1 style={{fontSize: "25px", textAlign:"center"}}>Customer Information</h1>
                    <Form.Group as={Row} controlId="summarygroup2">
                        {
                            [
                                'name',
                                
                            ].map(key => (
                                <>
                                <Form.Label column sm="1">
                                {this.kyclableconv[key]}
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control plaintext readOnly value={this.state.kycinfo[key]} />
                                </Col>
                                </>
                            ))
                        }
                    </Form.Group>
                    <Form.Group as={Row} controlId="summarygroup2">
                        <Form.Label column sm="2">
                        Address Proof:
                        </Form.Label>
                        <Col sm="3">
                        
                        {addr}
                        
                        </Col>
                        <Form.Label column sm="2">
                        Photo:
                        </Form.Label>
                        <Col sm="2">
                        {photo}
                        </Col>
                    </Form.Group>
                    <br></br>
                    
                    <h1 style={{fontSize: "25px"}}>Permanent Address</h1>
                    <Form.Group as={Row} controlId="summarygroup2">
                        {
                            [
                                'addrline1',
                                'addrline2',
                                'city'
                                
                            ].map(key => (
                                <>
                                <Form.Label column sm="2">
                                {this.kyclableconv[key]}
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control plaintext readOnly value={this.state.kycinfo[key]} />
                                </Col>
                                </>
                            ))
                        }
                    </Form.Group>
                    <Form.Group as={Row} controlId="summarygroup2">
                        {
                            [
                                
            
                            'district',
                            'state',
                            'PIN',
                            
                                
                            ].map(key => (
                                <>
                                <Form.Label column sm="2">
                                {this.kyclableconv[key]}
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control plaintext readOnly value={this.state.kycinfo[key]} />
                                </Col>
                                </>
                            ))
                        }
                    </Form.Group>
                    <br></br>
                    <h1 style={{fontSize: "25px"}}>Correspondence Address</h1>
                    <Form.Group as={Row} controlId="summarygroup2">
                        {
                            [
                                'caddrline1',
                                'caddrline2',
                                'ccity',
                                'cdistrict',
                                'cstate',
                                'cPIN',
                                
                            ].map(key => (
                                <>
                                <Form.Label column sm="2">
                                {this.kyclableconv[key]}
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control plaintext readOnly value={this.state.kycinfo[key]} />
                                </Col>
                                </>
                            ))
                        }
                    </Form.Group>
                    {/* <Form.Group as={Row} controlId="summarygroup2">
                        {
                            [
                                'name',
                                'addrline1',
                                'addrline2',
                                
                            ].map(key => (
                                <>
                                <Form.Label column sm="2">
                                {key}
                                </Form.Label>
                                <Col sm="2">
                                <Form.Control plaintext readOnly value={this.state.kycinfo[key]} />
                                </Col>
                                </>
                            ))
                        }
                    </Form.Group> */}
                    </Form>
                    
                </Row>
                <Row className="justify-content-md-center">
                    <Col style={{paddingTop: "55px", textAlign: "center"}}>
                    <Alert hidden={this.props.verified} variant="warning" style={{marginLeft: "5%", marginRight: "5%"}}>
                        KYC not complete. Application will be referred to BRM for further processing.
                    </Alert>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col style={{paddingTop: "5px", textAlign: "center"}}>
                    <Form.Group >
                        <Form.Check onChange={this.handleChange} type="checkbox" id="cnfrm" label="I agree to the terms and conditions." />
                    </Form.Group>
                    </Col>
                </Row>
                <Row >
                    <Col style={{paddingTop: "35px", textAlign: "center"}} sm="12">
                        <Button type="button" onClick={this.handleSubmit}>Submit Application</Button>
                    </Col>
                </Row>
                
            </Container>
            </>
        )
    }
}

export default Summary;