import React, { useEffect, useContext } from 'react';
import './deck-builder-styles.scss';
import DeckItems from '../deck-items/deck-items';
import ErrorMsg from '../error-msg-component/error-msg-component';
import DeckSearch from '../deck-search-component/deck-search-component';
import AdvanceSearch from '../advance-search-component/advance-search.component';
import {
	inputHandler,
	displayResults,
	deleter,
	selectHandler,
	clicker,
	searchClicker,
	checkErrMsg,
} from '../../utils/myHandlerFunctions';

import { MyContext } from '../../utils/context';

function DeckBuilder() {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		clicked,
		display,
		display2,
		setDisplay,
		style,
		setStyle,
		searchStyle,
		setSearchStyle,
		deck,
		setDeck,
		search,
		setSearch,
		setPageStyle,
		pageStyle,
		loading,
		setLoading,
	} = state;

	// useEffect hook for transitioning from different error messages
	useEffect(() => {
		// Variable for displaying err messages
		const { errMsg } = deck;
		let display1 = checkErrMsg(errMsg);

		// Check if display is true, then display error message and make it disappear after 2s
		if (display1) {
			setStyle((s) => {
				return { ...s, opacity: 1 };
			});
			setTimeout(() => {
				setStyle((s) => {
					return { ...s, opacity: 0 };
				});
			}, 2000);
		}
		// Page styling
		else if (pageStyle.opacity !== 1) {
			setPageStyle({ opacity: 1 });
		}
		// clicked on nav reset input component
		else if (clicked && (display === '' || display2 === '')) {
			setSearch((s) => {
				return {
					...s,
					results: '',
					input: '',
				};
			});
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					width: '10%',
					transform: 'translateX(0)',
					transform1: 'translateX(0) scale(0.7)',
					disabled: !searchStyle.disabled,
					padding: '0 0 0 2.5rem',
					btnDisplay1: 'none',
					btnDisplay2: 'none',
				};
			});
		}
	}, [
		deck,
		pageStyle.opacity,
		clicked,
		display,
		display2,
		setSearch,
		setSearchStyle,
		setStyle,
		setPageStyle,
	]);

	// Render component
	return (
		<section
			className="container deck-builder"
			style={{ opacity: pageStyle.opacity }}
		>
			<div className="deck-builder-cart">
				<h2 id="h2">Deck Builder</h2>
				<DeckItems
					title="Main Deck"
					setter={setStyle}
					style={{
						style: style.opacity1,
						anima: style.anima1,
						c: style.color1,
					}}
					clicker={(e) => clicker(e, style, setStyle, setDeck)}
					counter="60"
					deck={deck.main}
					del={deleter(deck, setDeck)}
				/>
				<DeckItems
					title="Extra Deck"
					setter={setStyle}
					style={{
						style: style.opacity2,
						anima: style.anima2,
						c: style.color2,
					}}
					clicker={(e) => clicker(e, style, setStyle, setDeck)}
					counter="15"
					deck={deck.extra}
					del={deleter(deck, setDeck)}
				/>
				<DeckItems
					title="Side Deck"
					setter={setStyle}
					style={{
						style: style.opacity3,
						anima: style.anima3,
						c: style.color3,
					}}
					clicker={(e) => clicker(e, style, setStyle, setDeck)}
					counter="15"
					deck={deck.side}
					del={deleter(deck, setDeck)}
				/>
			</div>

			<div className="deck-builder-content">
				<h2 id="search-title">Search</h2>
				<DeckSearch
					loader={loading}
					setLoader={setLoading}
					display1={display}
					selected={deck.selected}
					search={search}
					setSearch={setSearch}
					style={searchStyle}
					clicker={(e) =>
						searchClicker(
							e,
							search,
							setSearch,
							setDeck,
							searchStyle,
							setSearchStyle,
							setDisplay,
							display2
						)
					}
					displayResults={() => displayResults(search, deck, setDeck)}
					inputHandler={(e) => inputHandler(e, setSearch)}
				/>
				<AdvanceSearch
					loader={loading}
					setLoader={setLoading}
					display={display2}
					style={searchStyle}
					selected={deck.selected}
					search={search}
					setSearch={setSearch}
					clicker={(e) =>
						searchClicker(
							e,
							search,
							setSearch,
							setDeck,
							searchStyle,
							setSearchStyle,
							setDisplay,
							display2
						)
					}
					displayResults={() => displayResults(search, deck, setDeck)}
					inputHandler={(e) => inputHandler(e, setSearch)}
					selectHandler={(e) => selectHandler(e, setSearch, search)}
				/>
			</div>
			<ErrorMsg err={deck.errMsg} setDeck={setDeck} opacity={style.opacity} />
		</section>
	);
}

export default DeckBuilder;
