import React, { Component } from 'react';
import { Loader } from './components/Loader.js';
import './App.css';

class App extends Component {
	render() {
		return (
			<div id="sk-loader">
				<header className="header">
					<h1 className="title">S.K. Loader</h1>
					<h4 className="subtext">simple loader React UI component</h4>
				</header>
				<Loader />
			</div>
		);
	}
}

export default App;
