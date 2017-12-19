import React, { Component } from 'react';

import { Spinner } from './Spinner';
import { Buttons } from './Buttons';

let percent_increase;

export class Loader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			percentage: 0,
			transferState: 'inactive'
		};

		this.setTransferState = this.setTransferState.bind(this);
		this.setPercentage = this.setPercentage.bind(this);
		this.startTransfer = this.startTransfer.bind(this);
		this.pauseTransfer = this.pauseTransfer.bind(this);
		this.cancelTransfer = this.cancelTransfer.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.completeTransfer = this.completeTransfer.bind(this);
	}

	setTransferState( state ) {
		this.setState({
			transferState: state
		});
	}
	setPercentage( percentage ) {
		this.setState({
			percentage: percentage
		});
	}

	startTransfer() {
        // FALLBACK TO MAKE SURE INTERVAL IS CLEAR
		clearInterval( percent_increase );

        // IF RE-TRANSFERING > RESET VALUES AND RE-RUN START
		if ( this.state.transferState === 'completed' ) {
				this.setState({
					transferState: 'inactive',
					percentage: 0
				});

				setTimeout(() => {
					this.startTransfer();
				}, 500);
        // ELSE START LOADER AS NORMAL
		} else {
	        // BEGIN FAUX UPLOAD INTERVAL TO MIMICK % INCREASE
			percent_increase = setInterval( () => {
				// STOP LOOP ON 100% COMPLETE
				if ( this.state.percentage >= 100 ) {
					clearInterval( percent_increase );
					this.completeTransfer();
				} else {
					let percentage = this.state.percentage + 1;
					this.setPercentage( percentage );
				}
			}, 150 );

	        // SET TRANSFER STATE TO ACTIVE
			this.setTransferState('active');
		}
	}

	pauseTransfer() {
        // IF ALREADY PAUSED CONTINUE > ELSE PAUSE AND CLEAR INTERVAL
		let state;
		if ( this.state.transferState === 'paused' ) {
			this.startTransfer();
			state = 'active';
		} else {
			clearInterval( percent_increase );
			state = 'paused'
		}
        // TOGGLE PAUSED STATE
		this.setTransferState(state);
	}

	cancelTransfer() {
        // STOP CLICK ACTION DURING CANCEL ANIMATION
		if ( this.state.transferState === 'cancelled' ) return;
        // CLEAR INCREASE INTERVALS
		clearInterval( percent_increase );


		// UPDATE STATE TO CANCELLED
		this.setTransferState('cancelled');

		// STATE RESET ONCE PERCENT HITS 0
		const resetTransfer = () => {
			clearInterval( percent_decrease );
			// RESET STATE VALUES
			this.setTransferState('inactive');
		};

        // START DECREASE INTERVAL FOR UI ANIMATION
		const percent_decrease = setInterval( () => {
            // AT ZERO RESET STATE
			if ( this.state.percentage <= 0 ) {
				resetTransfer();
            // ELSE DECREASE PERCENTAGE
			} else {
				let percentage = this.state.percentage - 1;
				this.setPercentage( percentage );
			}
		}, 20 );
	}

	buttonClick(action) {
		if ( action === 'start' ) this.startTransfer();
		else if ( action === 'pause' ) this.pauseTransfer();
		else this.cancelTransfer();
	}

	completeTransfer() {
		this.setTransferState('completed');
	}

	render() {
		return (
			<div className="loader">
				<Spinner
					transferState={ this.state.transferState }
					percentage={ this.state.percentage }/>
				<Buttons
					transferState={ this.state.transferState }
					buttonClick={ this.buttonClick } />
			</div>
		);
	}
}
