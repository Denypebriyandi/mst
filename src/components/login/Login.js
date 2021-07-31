import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

class Login extends Component {
    _isMounted = false;
  	constructor(props) {
	    super(props);
	    this.state = {
            form: {
                username: '',
                password: ''
            },
            nameApi: 'http://127.0.01:3001/mst/login',
            redirectToReferrer: false
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentDidUpdate() {
    	console.log('componentDidUpdate')
  	}

  	componentWillUnmount() {
    	this._isMounted = false;
  	}

    changeForm = e => {
        let state = this.state.form;
        let field = e.target.id;
        state[field] = e.target.value;
        this.setState({state})
    }

    handleSubmit = e => {
        e.preventDefault();

        let status = 'error';

        axios({
            method: 'post',
            url: this.state.nameApi,
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'mst',
                password: '0987654321'
            },
            data: this.state.form,
            responseType: 'json',
            responseEncoding: 'utf8',
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            timeout: 60000
        })
        .then((response) => {
            sessionStorage.setItem('user',JSON.stringify(response.data.token));
			this.setState({
				redirectToReferrer: true
			})
            swal(response.statusText, response.data.message, "success");
        })
        .catch((error) => {
            if (error.response.status === 400) {
                status = 'warning';
            } else {
                status = 'error';
            }
            swal(error.response.statusText, error.response.data.message, status);
        })
    }
    render() { 
        if(this.state.redirectToReferrer) {

			return (<Redirect to={'/Home'} />)
		}

		if(sessionStorage.getItem('user')) {

			return (<Redirect to={'/Home'} />)
		}
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h2>Login</h2>
                        <hr/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" required minLength="6" name="username" value={this.state.value} onChange={this.changeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required minLength="6" name="password" value={this.state.value} onChange={this.changeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Link className="nav-link text-blue" to="/FogotPassword">Forgot Password</Link>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br/>
                            <br/>
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="sm">
                                    <Link className="nav-link text-white" to="/Register">Register</Link>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Login ;