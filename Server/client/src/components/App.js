import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import ImageUpload from './ImageUpload';
import Home from './Home';





class App extends Component {
	render() {
		return (
				<Router>
					<div className="App">
					<Switch>
						<Route exact path="/register" component={Registration} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Home} />
						{/* <Route exact path="/popup" component={PopUp} /> */}
						{/* <Redirect from="/" to="login" />*/}
						<Route exact path ="/images" component={ImageUpload}/>
					</Switch>
					</div>
				</Router>
		);
	}
}
export default App;
