import React, { useEffect, useContext } from 'react';
import './deck-search-help-styles.scss';
import { MyContext } from '../../utils/context';

function DeckSearchHelp({ opacity, display, title }) {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const { message, setMessage, display2 } = state;

	//useEffect hook for rendering different help msg for deck search help component
	useEffect(() => {
		// Display this help msg for the advance search component
		if (title === 'advance' && display2 !== 'none') {
			setMessage(
				`To ADD a card first you must select a deck by clicking any deck container. To SEARCH for a card, by selecting first the card type. If you only want to search for monsters, select monster, if only spell cards then select spell; etc. If monster was selected, you can search by archetype; by entering the exact name. Or you can search by the monster type ex: type=Aqua, and/or you can search by card attribute EX: attribute=Dark. You can also add sort options to the search, sort by atk or def; using gt(greater than),gte(greater than equal),lt(less than),lte(less than equal). To enter a valid value to atk or def, you enter the value with no spaces; EX: atk=gt2500 is valid, atk=gt 2500 is not valid. You can also sort your search by the level option min level is 1, max level is 12; no more, no less. The lt,lte,gt,gte values are accessible to the level option as well but must be entered correctly with no spaces. EX: level=gt2 is valid, (level= gt 2,level=gt 2) are not valid.`
			);
		}
		// Display this help msg for the search component
		else {
			setMessage(`To ADD a card first you must select a deck by clicking any deck container.
				To SEARCH for a card, use its name or part of it using the search box
				below. You can search for both the card's full name or a fragment of its
				name. Ex: "Dark Magician", "Magician", "Dark". If you choose to search
				for a part of the card's name, do so stating a continuous sequence of
				characters in its name. EX: "ark Ma" is a valid search for "Dark
				Magician", where "Dark ician" is not. Watch out for special symbols,
				common ones are required! EX: "Blue-Eyes" is OK, "Blue Eyes" is not.
				Other examples include "&". Searching for "Ash Blossom & Joyous Spring"
				will work, while "Ash Blossom and Joyous Spring" won't. When required,
				use hyphens "-", NOT dashes (hypens are the smaller ones). EX:
				"Blue-Eyes" is valid, "Blue–Eyes" isn't. Searches are not
				case-sensitive. EX: "Ghost Ogre", "ghost ogre", and "gHoSt OGre" are
				all the same.`);
		}
	}, [title, display2, message, setMessage]);
	// Render component
	return (
		<div className="deck-search-help" style={{ opacity: opacity, display }}>
			<h3>Search Tips</h3>
			<p>{message}</p>
			<div className="left-point"></div>
		</div>
	);
}

export default DeckSearchHelp;
