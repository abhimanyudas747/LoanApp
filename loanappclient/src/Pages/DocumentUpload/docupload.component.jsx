import React from 'react'
import {Container,Row, Col, Form, Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'

class DocUpload extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            addressproof: "",
            photo: ""
        }

        this.saveDetails = this.saveDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
    }


    saveDetails = async() => {
        console.log(this.state)
        var uploadData = new FormData();
        uploadData.append('AppID', this.props.AppID);
        uploadData.append('Type', 'addr')
        uploadData.append('File', this.state.addressproof)
        await fetch(this.props.api+'/upload', {
                                                method: 'post',
                                                body: uploadData
                                            })

        uploadData = new FormData();
        uploadData.append('AppID', this.props.AppID);
        uploadData.append('Type', 'photo')
        uploadData.append('File', this.state.photo)
        await fetch(this.props.api+'/upload', {
                                                method: 'post',
                                                body: uploadData
                                            })
        browserHistory.push("/Summary")
    }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.id]: e.target.files[0]
        })
        
    }





    render()
    {
        return(
            <Container fluid style={{height: "100vh", width: "60%", backgroundColor: "#ffffff", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)"}}>
                <Row className="justify-content-md-center">
                    <Col style={{paddingTop: "55px", textAlign: "center"}} sm="12">
                        <h1>Upload Supporting Documents</h1> 
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                    <Form style={{padding: "50px"}}>
                    <Form.Label>
                    Address Proof: 
                    </Form.Label>
                    <Form.Control
                        type="file"
                        id="addressproof"
                        label={this.state.addressproof}
                        onChange={this.handleChange}
                        custom
                    />
                    
                    </Form >
                    </Col>
                    <Col sm={6}>
                    <Form style={{padding: "50px"}}>
                    <Form.Label>
                    Photo: 
                    </Form.Label>
                    <Form.Control 
                        id="photo"
                        type="file"
                        label={this.state.photo}
                        onChange={this.handleChange}
                        custom
                    />
                    </Form>
                    </Col>
                </Row>

                <Row >
                    <Col style={{paddingTop: "35px", textAlign: "center"}} sm="12">
                        <Button type="button" onClick={this.saveDetails}>NEXT</Button>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}

export default DocUpload