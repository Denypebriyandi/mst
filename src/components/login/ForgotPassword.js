import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

class ForgotPassword extends Component {
    _isMounted = false;
  	constructor(props) {
	    super(props);
	    this.state = {
            form: {
                username: '',
                password: '',
                password2: ''
            },
            nameApi: 'http://127.0.01:3001/mst/login/forgotPassword',
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
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h2>Forgot Password</h2>
                        <hr/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" required minLength="6" value={this.state.value} onChange={this.changeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required minLength="6" value={this.state.value} onChange={this.changeForm} />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                Masukan password baru anda
                            </Form.Text>
                            <Form.Group className="mb-3" controlId="password2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required minLength="6" value={this.state.value} onChange={this.changeForm} />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                Ulangi password baru anda
                            </Form.Text>
                            <br></br>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="link">
                                <Link className="nav-link text-blue" to="/">Back to Login</Link>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div> 
        );
    }
}

export default ForgotPassword ;