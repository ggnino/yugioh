import React from 'react';
import './loading-styles.scss';

function LoadingComponent({ display }) {
	// Render component
	return (
		<div className="loading-content" style={{ display }}>
			<div className="loading-content__center-part"></div>
			<div className="loading-content__loader">
				<div className="loading-content__loader-content"></div>
			</div>
		</div>
	);
}

export default LoadingComponent;
