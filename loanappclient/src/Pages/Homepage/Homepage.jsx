import React from 'react'
import {Container, Nav, NavDropdown, Row, Col, Form} from 'react-bootstrap'
import Signup from '../../Components/sing-up/sing-up.component'
import Navbar from 'react-bootstrap/Navbar'
import {Redirect} from 'react-router-dom'
import {browserHistory} from 'react-router'
import './Homepage.css'

const Homepage = (props) =>
{
    document.title = "Welcome To LoanAPP. Loans made easy."
    if(props.user !== '')
    {
        browserHistory.push("/Pdetails")
    }
    return (
        <>
        
        <Container fluid className="main-ctr">
            <Row style={{height: "100vh"}}>
                <Col sm={6} className="flex-container">
                    <div className="tagline">
                        <h2 className="heading">
                            Loans Made Easy
                        </h2>
                        
                        <div className="tag-text">
                        We’ve simplified the process. Apply for our business loan in minutes, without painful paperwork or waiting in queues.
                        </div>
                    </div>
                </Col>
                <Col sm={6} className="form">
                    <Signup setToken={props.setToken} {...props} setUser={props.setUser} />
                </Col>
            
            </Row>
        </Container>

        <Container fluid className="bottom-ctr">
            <Row>
                <Col sm={12}>
                    <div className="bottom-head">
                        How our business loans work
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className="bottom-desc">
                    We’ve simplified the process. Apply for our business loan in minutes, without painful paperwork or waiting in queues.
                    </div>
                </Col>
            </Row>
        
            <Row className="steplist">
                <Col sm={3} style={{textAlign: "center"}}>
                    <img src="https://www.stopsignsandmore.com/images/product/medium/2322.gif" />
                    <h1 className="step-head">Easy application</h1>

                    <p className="step-desc">Complete our online application. It’s quick, easy, and confidential</p>
                </Col>
                <Col sm={3} style={{textAlign: "center"}}>
                    <img src="https://www.stopsignsandmore.com/images/product/medium/2322.gif" />
                    <h1 className="step-head">Fast decision</h1>

                    <p className="step-desc">If You’re Pre-Approved, E-Sign your Application To Confirm Funds.</p>
                </Col>
                <Col sm={3} style={{textAlign: "center"}}>
                    <img src="https://www.stopsignsandmore.com/images/product/medium/2322.gif" />
                    <h1 className="step-head">Get Your Cash</h1>

                    <p className="step-desc">Cash Deposited To Your Bank Account As Quickly As The Next Business Day.</p>
                </Col>
                <Col sm={3} style={{textAlign: "center"}}>
                    <img src="https://www.stopsignsandmore.com/images/product/medium/2322.gif" />
                    <h1 className="step-head">Repay Your Loan</h1>

                    <p className="step-desc">The Original Amount & The Fees Will Be Debited From Your Bank Account.</p>
                </Col>
            </Row>
        </Container>

          </>  
        
    )
}

export default Homepage;