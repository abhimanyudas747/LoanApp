import React from 'react';
import {Container, Nav, NavDropdown, Row, Col, Form, Button, Table} from 'react-bootstrap'
import './Dashboard.styles.css'

import {browserHistory} from 'react-router'



class Dashboard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            apps: [],
            showmodal: false
        }

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

        
        
        this.newapp = this.newapp.bind(this)
        this.logstate = this.logstate.bind(this);
        this.closemodal = this.closemodal.bind(this)
        this.refresh = this.refresh.bind(this);
    }

    refresh = () =>
    {
        fetch(this.props.api+"/get_rec_by_usr?UID="+this.props.User)
        .then(response => response.json())
        .then(
            data => this.setState({apps: data['Record']})
        )
    }

    newapp = () =>
    {
        // this.setState({
        //     showmodal: true
        // })
        browserHistory.push("/newapp")
    }

    closemodal = () =>
    {
        this.setState({
            showmodal: false
        })
    }


    logstate = () =>
    {
        this.state.apps.map(
            data => console.log(data['AppID'])
        )
        // console.log(this.state.apps)
    }

    componentDidMount()
    {
        // fetch(this.props.api+'/get_rec_by_usr?UID="+this.props.User)
        // .then(response => response.json())
        // .then(
        //     data => this.setState({apps: data['Record']})
        // )
        this.refresh()
        document.title = "Your Dashboard"
    }





    render()
    {
        if(this.props.Token === "")
        {
            browserHistory.push("/")
        }
        
        return (
            <>
            <Container fluid style={{height: "100vh", backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
                <Row style={{height: "15vh"}}>
                    <Col sm="12">
                        <h1 style={{position: "relative", top: "55px"}}>Dashboard</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <h2>Your Applications</h2>
                    </Col>
                    <Col sm="6">
                        
                        <Button className="addnewbtn" variant="primary" onClick={this.newapp}>New Application</Button>
                        
                    </Col>
                </Row>
                
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Application ID</th>
                    <th>Loan Amount (Lacs)</th>
                    <th>Loan Type</th>
                    <th>Frequency</th>
                    <th>Installment (Lacs)</th>
                    <th>Date Filed</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.apps.map(
                        app => (
                            
                    <tr>
                    <td>{app['AppID']}</td>
                    <td>{app['Loanamt']}</td>
                    <td>{this.typeconv[app['Type']]}</td>
                    <td>{this.freqconv[app['Frequency']]}</td>
                    <td>{app['Installment']}</td>
                    <td>{app['Datefiled']}</td>
                    <td>{app['Status']}</td>
                    </tr>


                        )
                    )}
                    
                </tbody>
              {/* { console.log(this.state) } */}
                </Table>

                
            </Container>

            
            </>
        )
    }
}


export default Dashboard;