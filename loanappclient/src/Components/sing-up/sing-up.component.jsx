import React from 'react'
import {Container, Nav, NavDropdown, Row, Col, Form} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
import './sing-up.styles.css'
import {browserHistory} from 'react-router'




class Signup extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            
            email: "",
            password: "",
            cpassword: "",
            uid: "",
            
            chkbx: "off"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (e) =>
    {
        // console.log("uid="+this.state.uid+"&"+"email="+this.state.email+"&"+"password="+this.state.password)
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (e) =>
    {
        if(this.state.chkbx !== "on")
        {
            alert("Please accept terms of service.")
            return;
        }
        if(this.state.password !== this.state.cpassword)
        {
            alert("Passwords don't match. Please try again.")
            return;
        }
        if(this.state.password.length < 8)
        {
            alert("Password should be atleast 8 characters long.")
            return;
        }

        if(this.state.email == "")
        {
            alert("Please enter your email")
            return;
        }
        if(this.state.uid == "")
        {
            alert("Please enter your UID")
            return;
        }


        // console.log(JSON.stringify(this.state))
        fetch(this.props.api+'/signup', {
                                                method: 'post',
                                                headers: {
                                                    "Content-Type": "application/x-www-form-urlencoded",
                                                },
                                                body: "uid="+this.state.uid+"&"+"email="+this.state.email+"&"+"password="+this.state.password
                                            })
        .then(response => response.json())
        .then(data => {
            if(data['Status'] == 'OK')
            {
                this.props.setToken("Token" + data['Token'])
                this.props.setUser(data['User'])
            }
            else{
                alert("Sign-up failed.")
            }
        })
        
        
        

    }


        render()
        { 
    return (
            <Form className="sign-up">

                        <h2 className="form-heading">Get Started</h2>
                        
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3" style={{color: "#ffffff"}}>
                            Email
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="uid">
                            <Form.Label column sm="3" style={{color: "#ffffff"}}>
                            UID
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="text" id="uid" name="uid" onChange={this.handleChange} placeholder="UID" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="3" style={{color: "#ffffff"}}>
                            Password
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="3" style={{color: "#ffffff"}}>
                            Confirm Password
                            </Form.Label>
                            <Col sm="9">
                            <Form.Control type="password" name="cpassword" onChange={this.handleChange} placeholder="Confirm Password" />
                            </Col>
                        </Form.Group>

                        

                        
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col sm={3}></Col>
                            <Col sm={9} style={{color: "#ffffff"}}>
                                <input type="checkbox" onChange={this.handleChange} name="chkbx"/>
                                I agree to the terms and conditions.
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col sm="3">
                            
                            </Col>
                            <Col sm="9">
                            <button type="button" onClick={this.handleSubmit}  class="btn btn-primary btn-lg" >GET YOUR LOAN NOW</button>
                            </Col>
                        </Form.Group>
                        
                        
                        
                        </Form>
                        
        )
        };
}

export default Signup;