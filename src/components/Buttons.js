import React from 'react';

import '../styles/Buttons.css';

export const Buttons = (props) => {
	const buttonClick = props.buttonClick,
		state = props.transferState;

	let buttons;
	if ( state === 'inactive' || state === 'completed' ) {
		buttons =
			<div>
				<span className="button transfer-button" onClick={() =>{ buttonClick('start') } }>{ props.transferState === 'completed' ? 'Transfer again?' : 'Transfer' }</span>
			</div>
	} else {
        // DISABLE PAUSE IF CANCELLING
		const pause_class = state === 'cancelled' ? 'button pause-button disabled' : 'button pause-button';
		buttons =
			<div>
				<span className={ pause_class } onClick={() =>{ buttonClick('pause') } }>{ props.transferState === 'paused' ? 'Continue' : 'Pause' }</span>
				<span className="button cancel-button" onClick={() =>{ buttonClick('cancel') } }>Cancel</span>
			</div>
	}

	return (
		<div className="loader__buttons">
			{ buttons }
		</div>
	);
}
