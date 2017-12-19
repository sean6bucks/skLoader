import React from 'react';

export const Spinner = (props) => {
    // SET SOME VALUES FOR CIRCLES AND STROKE
	const sideLength = 150,
		stroke = 10,
		cx = sideLength / 2,
		cy = cx,
		r = cx - ( stroke / 2 );

	return (
		<div className="loader__spinner">
			<svg className="loader__spinner--svg" height={ sideLength } width={ sideLength }>
				<circle className="loader__spinner--background" cx={ cx } cy={ cy } r={ r } stroke="#f8f8f8" fill="transparent" strokeWidth={ stroke }/>
				<circle className="loader__spinner--foreground" cx={ cx } cy={ cy } r={ r } stroke="#8b29d6" fill="transparent" strokeWidth={ stroke } strokeDasharray="350" strokeLinecap="round"/>
			</svg>
			<span className="loader__spinner--percent">
				{ props.percent || 0 }<span className="loader__spinner--percent-icon">%</span>
			</span>
		</div>
	);
}
