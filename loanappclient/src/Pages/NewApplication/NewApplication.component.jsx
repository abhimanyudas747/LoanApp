import React from 'react';
import {Container, Nav, NavDropdown, Row, Col, Form, Button, Table, DropdownButton, Dropdown} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import './NewApplication.styles.css'
import {TermLoan, HBLoan, PLoan, VHLoan} from './Termloan.modal.jsx'


class NewApplication extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            loantype: "PLoan",
            duration: 0,
            loanamt: 0,
            installment: 0,
            frequency: 1,
            showterm: false,
            showhb: false,
            showvh: false,
            durationdisable: false,
            propdetails: "",
            addr: "",
            val: "",
            vehiclemake: "",
            dname: "",
            AppID: ""


        }
        this.showmodal = this.showmodal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.closemodal = this.closemodal.bind(this)
        this.setDuration = this.setDuration.bind(this)
        this.propsetstate = this.propsetstate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit = async(e) =>
    {
        if(this.state.duration == 0){
            alert("Please enter loan duration")
            return
        }
        if(this.state.loanamt == 0){
            alert("Loan amount cannot be zero")
            return
        }


        await fetch(this.props.api+'/new_app', {
                                                method: 'post',
                                                headers: {
                                                    "Content-Type": "application/x-www-form-urlencoded",
                                                },
                                                body: "UID="+this.props.User+"&Loanamt="+this.state.loanamt+"&Status=Draft&Duration="+this.state.duration+"&Installment="+this.state.installment.toFixed(2)+"&Frequency="+this.state.frequency+"&Type="+this.state.loantype
                                            })
                                            .then(response => response.json())
                                            .then(data =>
                                                {
                                                    console.log(data)
                                                    this.props.setappid(data['AppID']['AppID__max'])
                                                    
                                                    
                                                })


                this.setState({
                    AppID: this.props.AppID
                })
                                            
                                
        

                if(this.loantype == "PLoan")
                {

                fetch(this.props.api+'/add_loandetails', {
                                                        method: 'post',
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded",
                                                        },
                                                        body: "AppID="+this.state.AppID
                                                    })

                                            
                }
                else if(this.loantype == "HB")
                {
                    fetch(this.props.api+'/add_loandetails', {
                                                        method: 'post',
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded",
                                                        },
                                                        body: "AppID="+this.state.AppID+"&Duration="+this.state.duration+"&Address_HB="+this.state.addr+"&Valuation_HB="+this.state.val
                                                    })
                }
                else
                {
                    //vhloan
                    fetch(this.props.api+'/add_loandetails', {
                                                        method: 'post',
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded",
                                                        },
                                                        body: "AppID="+this.state.AppID+"&Duration="+this.state.duration+"&Vehiclemake_VH="+this.state.vehiclemake+"&Currentval_VH="+this.state.val+"&Dealer_VH="+this.state.dname
                                                    })
                }

        


        
        this.props.setloantype(this.state.loantype)
        browserHistory.push("/Adetailsnew")
        
    }

    propsetstate = (newstate) => {
        console.log(newstate)
        this.setState(newstate)
    }

    componentDidUpdate() {
        var inst = this.state.loanamt*1.05/this.state.duration * this.state.frequency
        if(this.state.installment !== inst && this.state.duration !== 0 && this.state.frequency !== "0" && this.state.loanamt !== 0){
        this.setState({
            installment: inst
        })
    }
    }

    setDuration = (dur) =>
    {
        this.setState({
            loantype: "TERM",
            duration: dur
        })

    }

    closemodal = () =>
     {
         this.setState({
            showterm: false,
            showhb: false,
            showvh: false
         })
     }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    showmodal = (e) =>
    {
    //     if(e.target.value !== "0"){
    //         this.setState({
    //             [e.target.value]: true
    //         })

    // }
    if(e.target.value !== "showpers" || e.target.value !== "0") {
    this.setState({
        [e.target.value]: true
    })
}
    console.log(this.state)
    }




    render()
    {
        return (
            <>
            <Container fluid style={{height: "100vh", width: "80%", backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
            
                <Row className="justify-content-md-center">
                    <Col className="title" sm="12">
                        <h1>New Loan Application</h1> 
                    </Col>
                </Row>
                <Row style={{marginTop: "50px"}} className="justify-content-md-center">
                    <Col sm="3">
                    <Form>
                    <Form.Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                        
                        <Form.Control
                            as="select"
                            className="mr-sm-3"
                            id="inlineFormCustomSelect"
                            custom
                            onChange={this.showmodal}
                            name="loantype"
                        >
                            
                            <option value="showpers">Personal Loan</option>
                            <option value="showterm">Term Loan</option>
                            <option value="showhb">HB Loan</option>
                            
                            <option value="showvh">Vehicle Loan</option>
                        </Form.Control>
                        </Col>
                        <Col xs="auto" className="my-1">
                        <h1 style={{fontSize: "23px"}}>Loan Type</h1>
                        </Col>
                    </Form.Row>
                    </Form>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12">
                    <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Loan Duration:</Form.Label>
                        <Form.Label style={{float: "right"}}>{this.state.duration} Months</Form.Label>
                        <Form.Control disabled={this.state.durationdisable} type="range" min="1" max="1000" name="duration" onChange={this.handleChange}/>
                        
                    </Form.Group>
                    </Form>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12">
                    <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Loan Amount:</Form.Label>
                        <Form.Label style={{float: "right"}}>Rs.{this.state.loanamt} Lacs</Form.Label>
                        <Form.Control type="range" min="1" max="1000" name="loanamt" onChange={this.handleChange}/>
                        
                    </Form.Group>
                    </Form>
                    </Col>
                </Row>
                <Row style={{marginTop: "50px"}} className="justify-content-md-center">
                <Col sm={11}>
                    <Form.Group>
    
                    
                    <Form.Row className="justify-content-md-center">
                        
                        <Col sm={2}>
                        <Form.Control type="text" disabled value={this.state.installment.toFixed(2)} />
                        </Col>
                        <Form.Label column lg={2}>
                        <h1 style={{fontSize: "23px"}}>Installment</h1>
                        </Form.Label>
                    </Form.Row>
                    
                    </Form.Group>
                </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={3}>
                    <Form>
                    <Form.Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                        
                        <Form.Control
                            name="frequency"
                            as="select"
                            className="mr-sm-3"
                            id="inlineFormCustomSelect"
                            custom
                            onChange={this.handleChange}
                        >
                            {/* <option value="0">Choose...</option> */}
                            <option value="1">Monthly</option>
                            <option value="4">Quarterly</option>
                            <option value="6">Half Yearly</option>
                            <option value="12">Yearly</option>
                        </Form.Control>
                        </Col>
                        <Col sm={2} className="my-1">
                        <h1 style={{fontSize: "23px"}}>Frequency</h1>
                        </Col>
                    </Form.Row>
                    </Form>
                    </Col>
                </Row>

            <Row style={{paddingTop: "200px"}}>
                <Col sm={12}>
                    <Button onClick={this.props.logstate} variant="secondary"><h1 style={{fontSize: "23px"}}>Previous</h1></Button>
                    <Button onClick={this.handleSubmit} style={{float: "right"}} variant="primary"><h1 style={{fontSize: "23px"}}>Next</h1></Button>
                </Col>
            </Row>
            </Container>
            <TermLoan close={this.closemodal} setDuration={this.setDuration} show={this.state.showterm} />
            <HBLoan close={this.closemodal} setstate={this.propsetstate} show={this.state.showhb} />
            <VHLoan close={this.closemodal} show={this.state.showvh} setstate={this.propsetstate} />
            </>

        )
    }


}


export default NewApplication