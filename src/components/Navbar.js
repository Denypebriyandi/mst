import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class Nav extends Component {
  _isMounted = false;
  constructor(props) {
	  super(props);
    this.state = {
      redirectToReferrer: false
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    console.log(sessionStorage.getItem("user"))
    if(sessionStorage.getItem("user")) {
      const data = JSON.parse(sessionStorage.getItem("user"));
    } else {
        this.setState({ redirectToReferrer: true })
    }
  }

  componentDidUpdate() {
  	console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  logout = () => {
    sessionStorage.setItem('user','');
	  sessionStorage.clear();
	  this.setState({redirectToReferrer: !this.state.redirectToReferrer});
  }

  render() { 
    return (
      <Navbar bg="light" variant="light">
                <Container>
                  <Navbar.Brand href="/">Mitra Solusi Telematika</Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      {
		              			this.state.is_login ?
                        <Button variant="link" onClick={this.logout}>Logout</Button>
		              			: ""
		              		}
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
    )
  }
}

export default Nav ;