/* eslint eqeqeq: 0 */
import React from 'react'
import {Modal, Button, Form, Col} from 'react-bootstrap'

const VerifyAadhar = (props) => {
  
    const handleClose = () => props.closemodal();
    var otp = ""
    const handleChange = (e) =>
    {
        otp = e.target.value
    }

    const handleSubmit = (e) =>
    {
        if(otp == "12345"){
            props.verified();
        }
        else{
            alert("Incorrect OTP")
        }
    }
  
    return (
      <>
  
        <Modal show={props.showmodal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verify Aadhaar</Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter the OTP sent to your registered phone number:

          <Form style={{paddingTop: "5px"}}>
                <Form.Row className="align-items-center">
                    <Col sm={6}>
                    
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="Enter OTP"
                        name="aadhaar"
                        
                        onChange={handleChange}
                        required
                    />
                    </Col>
                    
                    
                    <Col sm={4}>
                    <Button type="button" onClick={handleSubmit} className="mb-2">
                        Verify
                    </Button>
                    </Col>
                </Form.Row>
                </Form>
          </Modal.Body>
          
        </Modal>
      </>
    );
  }
  
export default VerifyAadhar;