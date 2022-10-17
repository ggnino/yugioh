import React, { useEffect } from 'react';
import './deck-search-styles.scss';
import img1 from '../../imgs/cartoon-dark-magician-img.png';
import SearchResults from '../search-results-component/search-results-component';
import SearchInput from '../search-input-component/search-component';
import DeckSearchHelp from '../deck-search-help-component/deck-search-help';
import LoadingComponent from '../loading-component/loading-component';

function DeckSearch({
	displayResults,
	clicker,
	inputHandler,
	search,
	display1,
	loader,
	setLoader,
	style,
}) {
	// Object destructuring
	const { mouth, opacity, display, btnDisplay1, btnDisplay2 } = style;
	// useEffect hook for displaying loading component
	useEffect(() => {
		// show loading component if results have not been retrieved yet
		if (search.searching) {
			setLoader({
				loadingDisplay: 'initial',
				loadingDisplay2: 'none',
			});
		}
		// hide loading component when results have been retrieved or on mount
		else if (!search.searching) {
			setLoader({
				loadingDisplay: 'none',
				loadingDisplay2: 'initial',
			});
		}
	}, [search, setLoader]);
	// Render Component
	return (
		<div
			className="deck-search"
			style={{ display: display1 }}
			onClick={clicker}
			onKeyDown={clicker}
		>
			<img
				className="deck-search-img"
				src={img1}
				alt="dark-magician"
				title="wiz-help"
			/>
			<div
				className={`deck-search-img-mouth ${mouth}`}
				style={{ opacity }}
			></div>
			<DeckSearchHelp display={display} opacity={opacity} />
			<SearchInput style={style} value={search.input} input={inputHandler} />
			<LoadingComponent display={loader.loadingDisplay} />
			<SearchResults
				display={display1}
				displayResults={displayResults}
				search={search}
				btnDisplay1={btnDisplay1}
				btnDisplay2={btnDisplay2}
			/>
		</div>
	);
}

export default DeckSearch;
