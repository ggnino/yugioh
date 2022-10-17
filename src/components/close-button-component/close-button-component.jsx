import React from 'react';
import './close-button.styles.scss';

function CloseButton({ clicker }) {
	// Render component
	return (
		<span className="close-btn" title="close-btn" onClick={clicker}>
			&#10006;
		</span>
	);
}

export default CloseButton;
