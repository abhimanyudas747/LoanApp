import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Signin from '../sign-in/sign-in.component'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showsignin = this.showsignin.bind(this);
        this.state = {
            show: false,
            user: '',
            token: '',
            isauth: false
        }
        this.logout = this.logout.bind(this)
        this.closemodal = this.closemodal.bind(this)
        // this.state.isauth = props.user !== ""

    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
            token: this.props.token,
            isauth: this.props.token !== ''
        })
    }

    closemodal = () => {
        this.setState({
            show: false
        })
    }

    logout = () => {
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        this.setState({
            isauth: false
        })
        this.props.refresh();
        document.location = "/"

    }


    showsignin = () => {
        this.setState({
            show: true
        })

    }





    componentDidUpdate() {
        if (this.state.user !== this.props.user) {
            this.setState({
                user: this.props.user,
                token: this.props.token,
                isauth: this.props.token !== null
            })
        }


    }

    render() {
        return (
            <>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="/">LoanApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">How It Works</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">About</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">See Source</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link hidden={this.state.isauth} onClick={this.showsignin}>Sign In</Nav.Link>
                            <Nav.Link hidden={!this.state.isauth}>Welcome {this.props.fname}</Nav.Link>
                            <Nav.Link hidden={!this.state.isauth} onClick={this.logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Signin {...this.props} closemodal={this.closemodal} refresh={this.props.refresh} show={this.state.show} setUser={this.props.setUser} setToken={this.props.setToken} />
            </>
        )
    }


}


export default Header;