/* eslint eqeqeq: 0 */
import React from 'react'
import {Container, Button, Row, Col, Form} from 'react-bootstrap'
import './Asset-details.styles.css'
import {browserHistory} from 'react-router'




// NOT COMPLETE!!!!

class Adetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            mi: "",
            cbal: "",
            sbal: "",
            sec: "",
            perprop: "",
            re: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                                                body: "UID="+this.props.User+"&Firstname="+this.props.fname+"&Lastname="+this.props.lname+
                                                "&DOB="+this.props.dob+
                                                "&Phone="+this.props.phone+
                                                "&LastUpdated="+this.getCurrentDate('-')
                                            })
                                            .then(response => response.json())
                                            .then(data => {
                                                if(data['Status'] == 'OK')
                                                {
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

    componentDidMount() {
        
        fetch("http://127.0.0.1:8000/get_usr/?UID="+this.props.User)
        .then(response => response.json())
        .then(data => {
            if(data['Status'] == 'OK')
            {
                browserHistory.push("/dashboard")
            }
        })
    }



    render()
    {

        if(this.props.Token === "")
        {
            browserHistory.push("/")
        }
        return (

            
            
            <Container fluid style={{backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
            <Row style={{height: "30vh"}}>
                <Col sm={12} className="heading-flex">
                    <h1 className="heading-text">Enter Your Asset Details</h1>
                </Col>
                
            
            </Row>
            <Row style={{height: "70vh"}}>
                <Col sm={12} className="form-flex">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Monthly Income</Form.Label>
                        <Form.Control type="text" placeholder="Monthly Income" onChange={this.handleChange} name="mi"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Cash in Checking Accounts:</Form.Label>
                        <Form.Control type="text" placeholder="Balance" onChange={this.handleChange} name="cbal"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Cash in Savings Accounts:</Form.Label>
                        <Form.Control placeholder="Balance" onChange={this.handleChange} name="sbal"/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Securities:</Form.Label>
                        <Form.Control placeholder="Estimated Worth" onChange={this.handleChange} name="sec"/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Personal Property:</Form.Label>
                        <Form.Control placeholder="Estimated Worth" onChange={this.handleChange} name="perprop"/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Real Estate:</Form.Label>
                        <Form.Control placeholder="Estimated Worth" onChange={this.handleChange} name="re"/>
                    </Form.Group>

                    
                   

                    
                    <div style={{textAlign: "center"}}>
                        <Button variant="primary" type="submit">
                            Finish
                        </Button>
                        
                    </div>
                    </Form>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Adetails;