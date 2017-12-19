import React, { Component } from 'react';

import { Spinner } from './Spinner';
import { Buttons } from './Buttons';

export class Loader extends Component {
	constructor(props) {
		super(props);

		this.startLoad = this.startLoad.bind(this);
		this.pauseLoad = this.startLoad.bind(this);
		this.cancelLoad = this.cancelLoad.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	startLoad() {

	}

	pauseLoad() {

	}

	cancelLoad() {

	}

	handleClick(e) {

	}

	render() {
		return (
			<div className="loader">
				<Spinner />
				<Buttons />
			</div>
		);
	}
}
