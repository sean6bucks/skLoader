import React from 'react';

import '../styles/Spinner.css';

const spinnerClass = ( props ) => {
	let class_name = 'loader__spinner';

	// ADD CLASSES BASED ON STATE
	const state = props.transferState;
	if ( state === 'active' || state === 'paused' || state === 'cancelled' ) {
		class_name += ' spinner-active';
	};
	if ( state === 'paused' ) {
		class_name += ' spinner-paused';
	} else if ( state === 'cancelled' ) {
		class_name += ' spinner-cancelled';
	} else if ( state === 'completed' ) {
		class_name += ' spinner-completed';
	}

	return class_name;
};

export const Spinner = (props) => {
    // SET SOME VALUES FOR CIRCLES AND STROKE
	const sideLength = 150,
		stroke = 10,
		cx = sideLength / 2,
		cy = cx,
		r = cx - ( stroke / 2 ),
		circ = r * 2 * Math.PI,
		dash_size = ( props.percentage / 100 ) * circ;

    // ADD ACTIVE CLASS FOR SPINNER ANIMATION
	const state = props.transferState
	const spinner_class = spinnerClass( props );
    // SET STROKE COLOR BASED ON STATE
	const spinner_color = state === 'active' ? '#8b29d6' :
						state === 'paused' ? '#999' :
						state === 'cancelled' ? '#f05757' :
						state === 'completed' ? '#8ef488' :
						'#f8f8f8';

	return (
		<div className={ spinner_class }>
			<svg className="loader__spinner--svg" height={ sideLength } width={ sideLength }>
				<circle className="loader__spinner--svg-background" cx={ cx } cy={ cy } r={ r } stroke="#f8f8f8" fill="transparent" strokeWidth={ stroke }/>
				<circle className="loader__spinner--svg-foreground" cx={ cx } cy={ cy } r={ r } stroke={ spinner_color } fill="transparent" strokeWidth={ stroke } strokeDasharray={ [ dash_size, circ - dash_size ] } strokeLinecap="round"/>
			</svg>
			<span className="loader__spinner--percent">
				{ props.percentage || 0 }<span className="loader__spinner--percent-icon">%</span>
			</span>
			<svg className="loader__spinner--complete">
				<polyline className="loader__spinner--complete-path" fill="none" stroke="#8ef488" strokeWidth="10" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
			</svg>
		</div>
	);
}
