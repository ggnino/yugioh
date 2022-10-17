import React from 'react';
import img2 from '../../imgs/magnifying-glass.png';
import './search-component-styles.scss';
function SearchInput({ style, input, value }) {
	// Destructuring props
	const { width, transform, transform1, disabled, padding, left } = style;
	// Render component
	return (
		<div className="deck-search-input">
			<input
				style={{
					width,
					transform,
					padding,
				}}
				autoComplete="off"
				type="text"
				name="search"
				onChange={input}
				value={value}
				disabled={disabled}
				title="search-input"
			/>
			<img
				style={{ transform: transform1, left }}
				title="icon"
				src={img2}
				alt="search-icon"
			/>
		</div>
	);
}

export default SearchInput;
