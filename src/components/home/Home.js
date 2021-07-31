import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

class Home extends Component {
    _isMounted = false;
    constructor(props) {
	    super(props);
	    this.state = {
            redirectToReferrer: false,
            session: {}
        }
    }
    componentDidMount() {
        this._isMounted = true;
        if(sessionStorage.getItem("user")) {
            const data = JSON.parse(sessionStorage.getItem("user"));
            const decoded = jwt.verify(data, 'secret');
            this.setState({session: decoded.data[0]})
        } else {
            this.setState({ redirectToReferrer: true })
        }
    }
    render() { 
        if(this.state.redirectToReferrer) {
            return (<Redirect to={'/'} />)
        }
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h4>Selamat datang, {this.state.session.username}</h4>
                        <hr/>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Home ;