import React from 'react';

export const Buttons = (props) => {

	let buttons;
	if ( props.transfer_active ) {
		buttons =
			<div>
				<span className="button pause-button">Pause</span>
				<span className="button cancel-button">Cancel</span>
			</div>
	} else {
		buttons =
			<div>
				<span className="button transfer-button">Transfer</span>
			</div>
	}

	return (
		<div className="loader__buttons">
			{ buttons }
		</div>
	);
}
