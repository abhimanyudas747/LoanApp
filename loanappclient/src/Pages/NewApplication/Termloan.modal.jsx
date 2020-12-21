import React, {useState} from 'react';
import {Container, Nav, NavDropdown, Row, Col, Form, Button, Table, DropdownButton, Dropdown,InputGroup, FormControl, Modal} from 'react-bootstrap'

export const TermLoan = (props) => {
    const handleClose = () => props.close();
    var multiplier = 30
    var duration = 0
    var total = 0
    const handleChange = (e) => {
        if(e.target.name !== "dur") {
            multiplier = e.target.value
            console.log(multiplier)
        }
        else{
            duration = e.target.value
        }
    };
    const handleSubmit = (e) => {
        total = (multiplier * duration)/30
        props.setDuration(total)
        handleClose()

    }
  
    return (
      <>
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Term Loan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Row className="align-items-center">
                <Col sm={3} className="my-1">
                
                <Form.Control
                    as="select"
                    className="mr-sm-3"
                    id="inlineFormCustomSelect"
                    custom
                    onChange={handleChange}
                >
                    
                    <option value={30}>Months</option>
                    <option value="365">Years</option>
                    <option value="1">Days</option>
                </Form.Control>
                </Col>
                <Col sm={9} className="my-1">
                <Form.Control onChange={handleChange} name="dur" type="text" />
                </Col>
            </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export const HBLoan = (props) => {
const handleClose = () => props.close();
var propdetails = ""
var addr = ""
var val = 0

const handleChange = (e) => {
    switch(e.target.name)
    {
        case "propdetails" : propdetails=e.target.value; break;
        case "addr" : addr=e.target.value; break;
        case "val" : val=e.target.value; break;
    }
    
    
}

const handleSubmit = (e) => {
    e.preventDefault()
    if(propdetails == "" || addr == "" || val == 0){
        alert("Please enter all values")
        return
    }

    const obj = {
        propdetails: propdetails,
        addr: addr,
        val: val,
        loantype: "HB"
    }
    props.setstate(obj)
    console.log(obj)
    handleClose()
}

return (
    <>

    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>House Building Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Property Details</Form.Label>
        <Form.Control onChange={handleChange} name="propdetails" as="textarea" rows="3" />
        </Form.Group>
        <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control onChange={handleChange} name="addr" as="textarea" />
        </Form.Group>
        <Form.Label>Valuation (Approx)</Form.Label>
        <InputGroup className="mb-2 mr-sm-2">
        <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={handleChange} name="val" />
        </InputGroup>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
    </>
);
}


export const PLoan = (props) => {
const handleClose = () => props.close();

return (
    <>

    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Personal Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
    </>
);
}


export const VHLoan = (props) => {
const handleClose = () => props.close();
var val = 0;
var dname = "";
const handleChange = (e) => {
    switch(e.target.name)
    {
        case "dname" : dname=e.target.value; break;
        case "val" : val=e.target.value; break;
    }
}

const handleSubmit = (e) => {
    e.preventDefault()
    if(val == 0 || dname == ""){
        alert("Please enter all values")
        return
    }
    const obj = {
        dname: dname,
        val: val,
        loantype: "VH"
    }
    props.setstate(obj)
    console.log(obj)
    handleClose()
}


return (
    <>

    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Vehicle Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Dealer's Name</Form.Label>
            <Form.Control name="dname" onChange={handleChange} type="text" />
        </Form.Group>
        
        <Form.Label>Vehicle Make:</Form.Label>
        <Form.Group>
        
            <Form.Check inline label="2-Wheeler" type="radio" name="make"/>
            <Form.Check inline label="3-Wheeler" type="radio" name="make"/>
            <Form.Check inline label="4-Wheeler" type="radio" name="make"/>
        </Form.Group>
        <Form.Label>Current Value (Approx)</Form.Label>
        <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={handleChange} name="val" />
        </InputGroup>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
    </>
);
}

