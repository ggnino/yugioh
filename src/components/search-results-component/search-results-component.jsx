import React from 'react';
import './search-results-styles.scss';
import Button from '../button-component/button-component';

function SearchResults({
	displayResults,
	display,
	search,
	btnDisplay1,
	btnDisplay2,
}) {
	// Render component
	return (
		<div className="deck-search-results" style={{ display }}>
			<div className="deck-search-results-container">
				{
					// Render the cards from the search results
					search.results ? displayResults().map((result) => result) : ''
				}
			</div>
			<div className="deck-search-results-btns-container">
				<Button
					style={btnDisplay2}
					btn="Previous Results"
					classy="search"
					link="#"
				/>
				<Button
					style={btnDisplay1}
					btn="More Results"
					classy="search"
					link="#"
				/>
			</div>
		</div>
	);
}

export default SearchResults;
