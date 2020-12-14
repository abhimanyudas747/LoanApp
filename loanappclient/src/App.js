import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import {Container, Fade, Nav, NavDropdown} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header'
import Signin from './Components/sign-in/sign-in.component'
import {Router, Route, browserHistory} from 'react-router';
import Adetails from './Pages/asset-details/Asset-details.component'
import {Redirect} from 'react-router-dom'
import Pdetails from './Pages/personal-details/Personal-details.component'
import Dashboard from './Pages/Dashboard/Dashboard.component'
import NewApplication from './Pages/NewApplication/NewApplication.component'
import {Typea, Typeb} from './Pages/asset-details/Asset-details-new.component'
import Kyc from './Pages/KYC/kyc.component'
import DocUpload from './Pages/DocumentUpload/docupload.component'
import Summary from './Pages/Summary/summary.component'



class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      Token : "",
      User: "",
      fname: "",
      lname: "",
      phone: "",
      dob: "",
      loantype: "",
      AppID: "",
      verified: false,
      api: "http://127.0.0.1:8000"
    };

    
    
      
    

    

    this.setToken = this.setToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.refresh = this.refresh.bind(this);
    this.setPdetails = this.setPdetails.bind(this);
    this.logstate = this.logstate.bind(this);
    this.setloantype = this.setloantype.bind(this);
    this.setappid = this.setappid.bind(this);
    this.setverified = this.setverified.bind(this);
  }

  componentDidMount(){
    const tok = localStorage.getItem('Token')
    if(tok)
    {
    this.setState({Token: tok,
                    User: localStorage.getItem('User')},
                    () => {

                      fetch(this.state.api+"/get_usr/?UID="+this.state.User)
                      .then(response => response.json())
                      .then(data => {
                      if(data["Status"] == "OK")
                        {
                          
                            this.setState( { fname: data['Record'][0]['Firstname'],
                                             lname: data['Record'][0]['Lastname']
                                            },
                                            () => {console.log(data)}
                                         )
                          }
                                    }
                            )

                    })
    
    
        
      
    
    }
  }




  setverified = () =>
  {
    this.setState({
      verified: true
    })
  }

  setloantype = (loantype) =>
  {
    this.setState({
      loantype: loantype
    })
  }

  setappid = (appid) =>
  {
    this.setState({
      AppID: appid
    })
  }

  setPdetails = (details) =>
  {
    this.setState(details)
  }

  logstate = () =>
  {
    console.log(this.state)
  }
  refresh = () =>
  {
    fetch(this.state.api+"/get_usr/?UID="+this.state.User)
    .then(response => response.json())
    .then(data => {
      if(data["Status"] == "OK")
      {
        this.setState(
        {
          fname: data['Record'][0]['Firstname'],
          lname: data['Record'][0]['Lastname']
        }
      )}
    }
      )
  }

  

  


  setToken = (token) => {
    this.setState({
      Token: "Token "+token
    })
    localStorage.setItem('Token', this.state.Token)
    
  }

  setUser = (user) =>
  {
    this.setState({
      User: user
    })
    localStorage.setItem('User', this.state.User)
    fetch(this.state.api+"/get_usr/?UID="+this.state.User)
    .then(response => response.json())
    .then(data => {
      if(data["Status"] == "OK")
      {
        this.setState(
        {
          fname: data['Record'][0]['Firstname']
        }
      )}
    }
      )
    

  }

  render()
  {
    
    
    return (


      <div style={{backgroundColor: "#d5dbe3", paddingLeft:"5%", paddingRight: "5%"}}>
          
          <Header setToken={this.setToken} setUser={this.setUser} user={this.state.User} {...this.state} token={this.state.Token} refresh={this.refresh} fname={this.state.fname} />
          <Router history = {browserHistory}>
            
            <Route exact path='/' component={() => <Homepage user={this.state.User} {...this.state} token={this.state.Token} setToken={this.setToken} setUser={this.setUser} />} />
            <Route exact path="/Pdetails" component={() => <Pdetails user={this.state.User} token={this.state.Token} {...this.state} setPdetails={this.setPdetails} complete={this.state.pdetails} refresh={this.refresh} />} />
            <Route exact path="/Adetails" component={() => <Adetails logstate={this.logstate} {...this.state} />} />
            <Route exact path="/dashboard" component={() => <Dashboard logstate={this.logstate} {...this.state} />} />
            
            <Route exact path="/newapp" component={() => <NewApplication logstate={this.logstate} {...this.state} setloantype={this.setloantype} setappid={this.setappid} />} />
            <Route exact path="/typea" component={() => <Typea logstate={this.logstate} {...this.state} />} />
            <Route exact path="/typeb" component={() => <Typeb logstate={this.logstate} {...this.state} />} />
            <Route exact path="/Adetailsnew" component={() => this.state.loantype === "HB" ? <Typea logstate={this.logstate} {...this.state} /> : <Typeb logstate={this.logstate} {...this.state} />} />
            <Route exact path="/kyc" component={() => <Kyc logstate={this.logstate} {...this.state} setverified={this.setverified} />} />
            <Route exact path="/docupl" component={() => <DocUpload logstate={this.logstate} {...this.state} />} />
            <Route exact path="/summary" component={() => <Summary logstate={this.logstate} {...this.state} />} />
            
          </Router>
          
      </div>
    )
  }
}


export default App;
