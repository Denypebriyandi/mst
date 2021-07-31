import React from 'react';
import { BrowserRouter,  Route,  Switch } from 'react-router-dom';
import Login from '../src/components/login/Login';
import Register from '../src/components/register/Register';
import FogotPassword from './components/login/ForgotPassword';
import Home from './components/home/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div>
            <Navbar/>
          </div>
          <br/>
        	<Switch>
					  <Route exact path="/" component={Login} />
					  <Route path="/Register" component={Register} />
					  <Route path="/FogotPassword" component={FogotPassword} />
					  <Route path="/Home" component={Home} />
					</Switch>
				</div>
			</BrowserRouter>
    </div>
  );
}

export default App;
