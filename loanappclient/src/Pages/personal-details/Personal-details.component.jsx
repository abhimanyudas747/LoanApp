/* eslint eqeqeq: 0 */
import React from 'react'
import {Container, Button, Row, Col, Form} from 'react-bootstrap'
import './Personal-details.styles.css'
import {browserHistory} from 'react-router'


class Pdetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            dob: ""
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        fetch(this.props.api+"/get_usr/?UID="+this.props.user)
        .then(response => response.json())
        .then(data => {
            if(data['Status'] == 'OK')
            {
                browserHistory.push("/dashboard")
            }
        })
        console.log("mounted")
    }

    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        
        console.log(this.state)
        for (var i in this.state)
        {
            if(this.state[i] == "")
            {
                alert("All values not provided.");
                return;
            }
        }
        fetch(this.props.api+'/new_user', {
                                                method: 'post',
                                                headers: {
                                                    "Content-Type": "application/x-www-form-urlencoded",
                                                },
                                                body: "UID="+this.props.user+"&Firstname="+this.state.fname+"&Lastname="+this.state.lname+
                                                "&DOB="+this.state.dob+
                                                "&Phone="+this.state.phone+
                                                "&LastUpdated="+this.getCurrentDate('-')
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                if(data['Status'] == 'OK')
                                                {
                                                this.props.refresh()
                                                browserHistory.push("/dashboard")
                                                }
                                                else
                                                {
                                                    alert("Error occured when calling db")
                                                }
                                            })
    }


    
    handleChange = (e) =>
    {
      this.setState({
        [e.target.name]: e.target.value
    })
    }


    render()
    {
        if(this.props.token === "")
        {
            browserHistory.push("/")
        }
        return (
            
            <Container fluid style={{backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
            <Row style={{height: "30vh"}}>
                <Col sm={12} className="heading-flex">
                    <h1 className="heading-text">Enter Your Personal Details</h1>
                </Col>
                
            
            </Row>
            <Row style={{height: "70vh"}}>
                <Col sm={12} className="form-flex">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="FirstName" name="fname" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="LastName" onChange={this.handleChange} name="lname" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control placeholder="10 digit Phone Number" onChange={this.handleChange} name="phone" />
                    </Form.Group>

                    
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" onChange={this.handleChange} name="dob"/> 
                    </Form.Group>

                    
                    <div style={{textAlign: "center"}}>
                        <Button variant="primary" type="submit">
                            Proceed To Next Step >>>
                        </Button>
                    </div>
                    </Form>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Pdetails;