import React, { Component } from 'react';
import Login from './components/login/Login';
import Routers from './components/router/route';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Routers />
			</div>
		);
	}
}

export default App;
