import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../scenes/Login";
// import ProviderTypes from './scenes/ProviderTypes/ProviderTypes'
import Skeleton from '../components/Skeleton/Skeleton';
import ProviderTypes from '../scenes/ProviderTypes/ProviderTypes';

class AppRouter extends Component {
	componentWillMount() {
		
	}

	render() {
		//const ServicesWithCountry = withCountry(Services);
		const initialCsrf = this.props.initialCsrf;
		console.log(initialCsrf, this.props);
		sessionStorage.setItem("csrf", initialCsrf);
		return (
			<Router>
				<Route path='/userlogin' component={props => <Login {...props} />} />
				<Skeleton>
					<Route path='/provider-types' component={props => <ProviderTypes {...props} />} />
				</Skeleton>
			</Router>
		)
	}
}

export default AppRouter;