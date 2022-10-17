import axios from 'axios';
import Card from '../components/card-component/card-component';

export const advanceSearchOptions = (
	e,
	setState,
	setStyle,
	search,
	setDisplay
) => {
	// Object destructoring
	const { radioBtns } = search;
	const { cardType, cardOptions, cardSort } = radioBtns;

	// Variables
	let spell = false,
		monster = false,
		trap = false,
		atk = false,
		def = false,
		level = false,
		input = '',
		transform = '90%',
		padding = '',
		included = false,
		archetype = false,
		type = false,
		attribute = false;

	const title = setVariable(e.target.title);
	// Check which selection was made
	if (title) {
		// Main card type selection
		if (title === 'monster') monster = true;
		else if (title === 'spell') spell = true;
		else if (title === 'trap') trap = true;

		// Apply main card type styling
		if (monster || trap || spell) {
			setDisplay((display) => {
				return {
					...display,
					clicked: false,
				};
			});
			setStyle((style) => {
				return {
					...style,
					width: '10%',
					transform1: 'scale(0.7)',
					padding: '0 0 0 2.5rem',
					left: '47%',
					disabled: true,
				};
			});

			setState((search) => {
				return {
					...search,
					input,
					radioBtns: {
						...search.radioBtns,
						cardType: { monster, spell, trap },
						cardOptions: { archetype: false, type: false, attribute: false },
						cardSort: { atk, def, level },
						select1: 'Select CardType',
						select2: 'Select Attribute',
					},
				};
			});
		}
		// Card options selection
		if (title === 'archetype') archetype = true;
		if (title === 'type') type = true;
		if (title === 'attribute') attribute = true;

		// Card options
		if (archetype || type || attribute) {
			input = `${title}=EnterValue`;
			padding = '0 6.5rem 0.5rem 1rem';

			if (window.innerWidth <= 1700) {
				transform = '88%';
				padding = `0 5.5rem 0.5rem 1rem`;
			}
			if (window.innerWidth <= 800) {
				transform = '85%';
				padding = `0 2rem 0 1rem`;
			}

			setStyle((style) => {
				return {
					...style,
					width: '100%',
					transform: 'translateX(0rem)',
					transform1: '',
					left: transform,
					disabled: false,
					padding,
				};
			});
			// if archetype is selected
			if (archetype) {
				// Check to see if spell or trap is selected
				if (cardType.spell || cardType.trap) {
					// check to see if type is included in the input
					if (search.input.includes('type')) {
						type = true;
						// if archetype not included, add archetype
						if (!search.input.includes('archetype'))
							input = `${e.target.title}=EnterValue,${search.input}`;
						// add no new value if archetype is included
						else input = search.input;
					}
					// Add archetype selection when input empty
					else input = `${title}=EnterValue`;
				}
			} else if (type) {
				archetype = false;
				type = true;
				// if attribute is selected, keep selection
				if (cardOptions.attribute) attribute = true;
				// Check to see if spell or trap is selected
				if (cardType.spell || cardType.trap) {
					// check to see if archetype is included in the input
					if (search.input.includes('archetype')) {
						archetype = true;
						// Archetype is the only value, add type selection
						if (!search.input.includes(','))
							input = `${search.input},${title}=${search.radioBtns.select1}`;
						// add no new value
						else input = search.input;
					} else if (search.input.includes('type')) input = search.input;
					// Add type selection when input empty
					else {
						input = `${title}=${search.radioBtns.select1}`;
					}
				}
				// attribute is selected and type is not included, add type selection
				else if (attribute && !search.input.includes('type')) {
					input = `${title}=${search.radioBtns.select1},${search.input}`;
				}
				// Add type selection when input empty
				else if (search.input.includes('archetype')) {
					input = `${title}=${search.radioBtns.select1}`;
				} else if (!search.input.includes('type')) {
					input = `${title}=${search.radioBtns.select1}`;
				}
				// Type is already selected, add no new value
				else if (cardOptions.type) input = search.input;
			}
			// Check if event came from attribute element
			else if (attribute) {
				// if type us selected, keep selection
				if (cardOptions.type) type = true;

				// if type is selected and attribute is not included
				if (type && !search.input.includes('attribute')) {
					// input string into input array
					if (search.input.includes(',')) input = search.input.split(',');
					else input = search.input.split(' ');

					// if input has one value, add selection and value
					if (input.length === 1) {
						input = `${search.input},${title}=${e.target.value}`;
					} else {
						// Iterate over input array
						for (let index = 0; index < input.length; index++) {
							// if array element includes type, add selection and value into array
							if (input[index].includes('type')) {
								input.splice(index + 1, 0, `${title}=${e.target.value}`);
								break;
							}
						}
						// Input array back into input string
						input = input.join(',');
					}
				}
				// clear input and add attribute value only
				else input = `${title}=${e.target.value}`;
			}

			setState((search) => {
				return {
					...search,
					input,
					radioBtns: {
						...search.radioBtns,
						cardOptions: { archetype, type, attribute },
						cardSort: {
							atk: false,
							def: false,
							level: false,
						},
					},
				};
			});
		}

		// Card sort selection
		if (title === 'atk') atk = true;
		else if (title === 'def') def = true;
		if (title === 'level') level = true;

		// Check if any of the card sort selections have been made
		if (atk || def || level) {
			// Check if input has one or more value, split into an array
			if (search.input.includes(',')) {
				input = search.input.split(',');
			}
			// else an array of single value
			else input = search.input.split(' ');

			// if level is selected
			if (level) {
				// Deselect atk
				if (cardSort.atk) {
					atk = true;
					def = false;
				}
				// Deselect def
				else if (cardSort.def) {
					atk = false;
					def = true;
				}
				// Add level option in the input
				input = `${search.input},${title}=${e.target.value}`;
			}
			// if atk or def was selected
			else if (atk || def) {
				// if level is selected already, keep selection
				if (cardSort.level) level = true;
				// if input has more than two values
				if (input.length > 2) {
					// modify input add value
					inputModifier(input, title, e.target.value, null, atk, def);
					input = input.join(',');
				}
				// if input has two values or less
				else if (input.length <= 2) {
					// modify input add value
					inputModifier(input, title, e.target.value, null, atk, def);
					// check any selections included already in the input
					if (
						search.input.includes('def') ||
						search.input.includes('atk') ||
						search.input.includes('level')
					) {
						included = true;
					}
					// check if selection has already been selected
					if (
						(def && search.input.includes('def')) ||
						(atk && search.input.includes('atk'))
					) {
						// if selection is already in the input, dont add no new value
						input = search.input;
					}
					// Input has only one value, add selection
					else if (!included) {
						input = `${search.input},${title}=${e.target.value}EnterValue`;
					}
					// After updating input array join into input string
					else input = input.join(',');
				}
			}
			setState((search) => {
				return {
					...search,
					input,
					radioBtns: {
						...search.radioBtns,
						cardSort: { atk, def, level },
					},
				};
			});
		}
	}
};

export const displaySearchResults = (e, search, setSearch, setSearchStyle) => {
	const title = setVariable(e.target.title);
	// Check the event came from the More Results button
	if (title === 'More Results') {
		// Check if we can continue on through the results (always displaying 5 at time)
		if (search.loop + 5 <= search.results.length) {
			// Hide buttons depends on where in the list, are we
			if (search.loop + 5 === search.results.length) {
				setSearchStyle((searchStyle) => {
					return {
						...searchStyle,
						btnDisplay1: 'none',
						btnDisplay2: '',
					};
				});
			} else {
				setSearchStyle((searchStyle) => {
					return { ...searchStyle, btnDisplay1: '', btnDisplay2: '' };
				});
			}
			// Continue on throught the search results
			setSearch({ ...search, loop: search.loop + 5 });
		}
		// Displays whats left in the search results array, (when there is less than 5 items left)
		else {
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					btnDisplay1: 'none',
					btnDisplay2: '',
				};
			});
			setSearch({
				...search,
				loop: search.results.length,
			});
		}
	} // Check the event came from the Previous Results button
	else if (title === 'Previous Results') {
		// Check to see if we are going back to the begining of the results array
		if (search.loop - 5 === 5) {
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					btnDisplay1: '',
					btnDisplay2: 'none',
				};
			});
			setSearch({ ...search, loop: 5 });
		} // Check to see if we can go back displays the 5 results as always
		else if (search.loop % 5 === 0) {
			setSearchStyle((searchStyle) => {
				return { ...searchStyle, btnDisplay1: '', btnDisplay2: '' };
			});
			setSearch({ ...search, loop: search.loop - 5 });
		}
		// Displays whats left in the search results array, (when there is less than 5 items left)
		else {
			// Check to see if the results array is less than 10 to hide buttons properly
			if (search.results.length < 10) {
				setSearchStyle((searchStyle) => {
					return {
						...searchStyle,
						btnDisplay1: '',
						btnDisplay2: 'none',
					};
				});
			} else
				setSearchStyle((searchStyle) => {
					return { ...searchStyle, btnDisplay1: '', btnDisplay2: '' };
				});
			// Displays whats left in the results array
			setSearch({ ...search, loop: search.loop - (search.loop % 5) });
		}
	}
};
// Deck items onHover handler
export const deckItemsHover = (e, style, setter) => {
	if (e.type === 'mouseenter') {
		if (e.target.title === 'Main Deck') {
			setter((s) => {
				return {
					...s,
					opacity1: 1,
				};
			});
		} else if (e.target.title === 'Extra Deck') {
			setter((s) => {
				return {
					...s,
					opacity2: 1,
				};
			});
		} else if (e.target.title === 'Side Deck') {
			setter((s) => {
				return {
					...s,
					opacity3: 1,
				};
			});
		}
	} else if (e.type === 'mouseleave') {
		if (style.anima !== 'running' && e.target.title === 'Main Deck') {
			setter((s) => {
				return { ...s, opacity1: 0 };
			});
		} else if (style.anima !== 'running' && e.target.title === 'Extra Deck') {
			setter((s) => {
				return { ...s, opacity2: 0 };
			});
		} else if (style.anima !== 'running' && e.target.title === 'Side Deck')
			setter((s) => {
				return { ...s, opacity3: 0 };
			});
	}
};

export const displayWizHelp = (e, opacity, setSearchStyle) => {
	const title = setVariable(e.target.title);
	// Check to see if event came from the wizard to apply animation
	if (title === 'wiz-help' || title === 'kuriboh-help') {
		// If the wizard mouth is closed, open it and display message
		if (opacity === 0) {
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					display: '',
				};
			});
			setTimeout(
				() =>
					setSearchStyle((searchStyle) => {
						return {
							...searchStyle,
							opacity: 1,
							mouth: 'open-mouth',
						};
					}),
				100
			);
		}
		// If the wizard mouth is open, close it and hide message
		else {
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					opacity: 0,
					mouth: 'close-mouth',
				};
			});
			setTimeout(
				() =>
					setSearchStyle((searchStyle) => {
						return {
							...searchStyle,
							display: 'none',
						};
					}),
				100
			);
		}
	}
};

export const getSearchResults = (
	e,
	search,
	setSearch,
	width,
	setSearchStyle,
	setDeck,
	showing
) => {
	const title = setVariable(e.target.title);
	let transform = `90%`;
	let padding = `0 6.5rem 0.5rem 1rem`;

	if (window.innerWidth <= 1700) {
		transform = '88%';
		padding = `0 5.5rem 0.5rem 1rem`;
	}
	if (window.innerWidth <= 800) {
		transform = '85%';
		padding = `0 2rem 0 1rem`;
	}

	// Check to see if event came from the search icon
	if (title === 'icon' || (e.keyCode === 13 && title === 'search-input')) {
		let disabled = false;
		if (showing !== 'none') disabled = true;
		if (width === '100%') {
			let searching = false;

			// Check to see if search bar is displayed properly
			// Checks if there is enough chars in the input and send GET request for search results
			if (search.input !== '' && search.input.length > 2) {
				const { monster, spell, trap } = search.radioBtns.cardType;

				searching = true;

				// search GET request
				let input = `fname=${search.input}`;

				// check if its an advance search
				if (monster || spell || trap) {
					input = search.input;
					if (input.includes(',')) {
						input = input.replace(/,/g, '&');
						input = input.split('&');
						if (input[1].includes('type')) {
							input[1] = input[1].replace('type', 'race');
						}
						input = input.join('&');
					} // Bug type not working correctly for spell/trap
					if (input.includes('type') && !input.includes('archetype'))
						input = input.replace('type', 'race');
					if (monster) {
						input = `${input}&type=Effect Monster,Flip Effect Monster,Flip Tuner Effect Monster,Gemini Monster,Normal Monster,Normal Tuner Monster,Pendulum Effect Monster,Pendulum Flip Effect Monster,Pendulum Normal Monster,Pendulum Tuner Effect Monster,Ritual Effect Monster,Ritual Monster,Spirit Monster,Toon Monster,Tuner Monster,Union Effect Monster,Fusion Monster,Link Monster,Pendulum Effect Fusion Monster,Synchro Monster,Synchro Pendulum Effect Monster,Synchro Tuner Monster,XYZ Monster,XYZ Pendulum Effect Monster`;
					} else if (spell) {
						input = `${input}&type=Spell Card`;
					} else if (trap) {
						input = `${input}&type=Trap Card`;
					}
				}
				// GET request
				axios
					.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${input}`)
					// Successful request fill the search results array
					.then((response) => {
						// Variable for search loop
						let loop = response.data.data.length;

						searching = false;
						// if theres 5 or more results and hide prev button
						if (loop > 5) {
							loop = 5; // five for starting position
							setSearchStyle((searchStyle) => {
								return {
									...searchStyle,
									btnDisplay1: '',
									btnDisplay2: 'none',
								};
							});
						}
						// less than 5 results and hide both buttons
						else {
							setSearchStyle((searchStyle) => {
								return {
									...searchStyle,
									btnDisplay1: 'none',
									btnDisplay2: 'none',
								};
							});
						}
						setSearch({
							...search,
							results: response.data.data,
							loop: loop,
							searching: false,
						});
					})
					// Send an error message from no results
					.catch((err) => {
						setSearch({ ...search, input: '' });
						setDeck((deck) => {
							return {
								...deck,
								errMsg: { ...deck.errMsg, search: true },
							};
						});

						setSearchStyle((searchStyle) => {
							return {
								...searchStyle,
								width: '10%',
								transform1: 'translateX(0) scale(0.7)',
								left: '47%',
								disabled: true,
							};
						});
					});
				// Search results not received, show loader
				if (searching) {
					setSearch((s) => {
						return {
							...s,
							searching: true,
							results: '',
							loop: '',
						};
					});
					setSearchStyle((searchStyle) => {
						return {
							...searchStyle,
							btnDisplay1: 'none',
							btnDisplay2: 'none',
						};
					});
					console.log('SEARCHING...............');
				}
			}
			// If input length is less than 3 chars
			else {
				// less than 3 chars but not zero char, reset input and then send input error message
				if (search.input.length !== 0) {
					setSearch({ ...search, input: '' });
					setDeck((deck) => {
						return {
							...deck,
							errMsg: { ...deck.errMsg, input: true },
						};
					});
				}

				// apply animation
				setSearchStyle((searchStyle) => {
					return {
						...searchStyle,
						width: '10%',
						transform: 'translateX(0)',
						transform1: 'translateX(0) scale(0.7)',
						left: '47%',
						disabled: true,
						padding: '0 0 0 2.5rem',
					};
				});
			}
		}
		// Empty input apply animation
		else {
			setSearchStyle((searchStyle) => {
				return {
					...searchStyle,
					width: '100%',
					transform: 'translateX(0rem)',
					transform1: '',
					left: transform,
					disabled,
					padding,
				};
			});
		}
	}
};

// onChange handler for search input component
export const inputHandler = (e, setSearch) => {
	setSearch((search) => {
		return { ...search, input: e.target.value };
	});
};

// The dispalyResults function displays cards for the search result component
export const displayResults = (search, deck, setDeck) => {
	// Variables for loop counter and storing cards into an array
	let count = 0;
	let cardArr = [];

	// Check is search loop is greater than 5, to assign the loop counter properly
	// Ex: loop = 15, counter = 10, display results [10-15]
	if (search.loop > 5) count = search.loop - 5;
	// Iterate through the search results
	for (count; count < search.loop; count++) {
		// Add the cards to the cardArr
		cardArr.push(
			<Card
				key={search.results[count].id}
				id={'searchCard'}
				decks={{ deck, setDeck }}
				cardInfo={search.results[count]}
				selected={deck.selected}
			/>
		);
	}
	// For rendering later
	return cardArr;
};

// Handler for deleteing cards from deck
export const deleter = (deck, setDeck) => {
	// Callback to perform deletion
	return (index, name) => {
		// Arr for modifying deck
		let arr = [...deck[name]];
		// Delete card from deck
		arr.splice(index, 1);
		// Set new deck
		setDeck({ ...deck, [name]: [...arr] });
	};
};

// Function for modifying the input by selection and its value
function inputModifier(
	input,
	selection,
	value,
	selection2 = null,
	atk = null,
	def = null
) {
	if (atk || def) {
		// Iterate over the input array
		for (let index = 0; index < input.length; index++) {
			// Def selected and atk is included, replace both atk and its value
			if (def && input[index].includes('atk')) {
				input[index] = input[index].split('=');
				input[index][0] = 'def';
				input[index][1] = `${value}`;
				input[index] = input[index].join('=');

				break;
			}
			// Atk selected and def is included, replace both def and its value
			else if (atk && input[index].includes('def')) {
				input[index] = input[index].split('=');
				input[index][0] = 'atk';
				input[index][1] = `${value}`;
				input[index] = input[index].join('=');

				break;
			}
			// Level selected, add atk/def selection before the level selection
			else if (input[index].includes('level')) {
				input[index + 1] = input[index];
				input[index] = `${selection}=${value}`;
				break;
			}
		}
	} else {
		// Iterate over input array
		input.forEach((option, index) => {
			// if selected option is type, update its value
			if (selection2) {
				if (option.includes(selection) && !option.includes('archetype')) {
					option = option.split('=');
					option[1] = `${value}`;
					option = option.join('=');
					input[index] = option;
				}
			}

			// if selected option is attribute, update its value
			else if (option.includes(selection)) {
				option = option.split('=');
				if (selection === 'atk' || selection === 'def')
					option[1] = `${value}EnterValue`;
				else option[1] = `${value}`;
				option = option.join('=');
				input[index] = option;
			}
		});
	}
}
// Onchange handler for select elements
export const selectHandler = (e, setSearch, search) => {
	const { radioBtns } = search;
	const { cardOptions } = radioBtns;
	let input = '',
		x = false,
		selection = '';

	if (e.target) {
		input = search.input;

		selection = setVariable(e.target.title);
		// Input has more than one value
		if (input.includes(',')) {
			input = input.split(',');
			// If type selector
			if (selection === 'select1') {
				inputModifier(input, 'type', e.target.value, 'archetype');
			}
			// If attribute selector
			else if (selection === 'select2') {
				inputModifier(input, 'attribute', e.target.value);
			}
			// If atk selector
			else if (selection === 'select3') {
				inputModifier(input, 'atk', e.target.value);
			}
			// If def selector
			else if (selection === 'select4') {
				inputModifier(input, 'def', e.target.value);
			} // If level selector
			else if (selection === 'select5') {
				inputModifier(input, 'level', e.target.value);
			}
			// Input array into input string
			input = input.join(',');
		}
		// Input array is one value
		else {
			// if input is not empty split it
			if (search.input.length > 1) {
				x = true;
				input = search.input.split('=');
			}

			// Update type value in the input
			if (cardOptions.type && selection === 'select1') {
				input[1] = `${e.target.value}`;
			}
			// Update attribute value in the input
			else if (cardOptions.attribute && selection === 'select2') {
				input[1] = `${e.target.value}`;
			}
			// If input was split rejoin it
			if (x) input = input.join('=');
		}
		setSearch((search) => {
			return {
				...search,
				input,
				radioBtns: {
					...search.radioBtns,
					[selection]: e.target.value,
				},
			};
		});
	}
};

// onClick handler for styling the deck items component
export const clicker = (e, style, setStyle, setDeck) => {
	// Check where the event is coming from
	const title = setVariable(e.target.title);

	// Apply following styles depending on the title variable
	if (title === 'Main Deck') {
		// Check if border 1 is applied, animate border if is not running, hide any other borders that might be showing
		if (style.opacity1 && style.anima1 !== 'running') {
			setStyle({
				...style,
				opacity2: 0,
				opacity3: 0,
				anima1: 'running',
				anima2: 'paused',
				anima3: 'paused',
				color1: '#f2bb05',
				color2: '',
				color3: '',
			});
			// Deck selection
			setDeck((deck) => {
				return { ...deck, selected: 'main' };
			});
		}
		// else if border is animated, stop border animation and deselect deck
		else {
			setStyle({
				...style,
				anima1: 'paused',
				color1: '',
			});
			setDeck((deck) => {
				return { ...deck, selected: 'none' };
			});
		}
		// Check if border 1 isnt applied, apply border 1 and add selection
	} else if (title === 'Extra Deck') {
		// Check if border 2 is applied, animate border if is not running, hide any other borders that might be showing
		if (style.opacity2 && style.anima2 !== 'running') {
			setStyle({
				...style,
				opacity1: 0,
				opacity3: 0,
				anima1: 'paused',
				anima2: 'running',
				anima3: 'paused',
				color1: '',
				color2: '#f2bb05',
				color3: '',
			});
			// Deck selection
			setDeck((deck) => {
				return { ...deck, selected: 'extra' };
			});
		}
		// else if border is animated, stop border animation and deselect deck
		else {
			setStyle({ ...style, anima2: 'paused', color2: '' });
			setDeck((deck) => {
				return { ...deck, selected: 'none' };
			});
		}
	} else if (title === 'Side Deck') {
		// Check if border 2 is applied, animate border if is not running, hide any other borders that might be showing
		if (style.opacity3 && style.anima3 !== 'running') {
			setStyle({
				...style,
				opacity1: 0,
				opacity2: 0,
				anima1: 'paused',
				anima2: 'paused',
				anima3: 'running',
				color1: '',
				color2: '',
				color3: '#f2bb05',
			});
			// Deck selection
			setDeck((deck) => {
				return { ...deck, selected: 'side' };
			});
		}
		// else if border is animated, stop border animation and deselect deck
		else {
			setStyle({ ...style, anima3: 'paused', color3: '' });
			setDeck((deck) => {
				return { ...deck, selected: 'none' };
			});
		}
	}
};

// Function for setting variables by selection
function setVariable(title) {
	let selection = title;

	// Atk selector
	if (title === 'atkx') selection = 'select3';
	// Def selector
	if (title === 'defx') selection = 'select4';
	// Level selector
	if (title === 'levelx') selection = 'select5';

	return selection;
}

// onClick handler for search components
export const searchClicker = (
	e,
	search,
	setSearch,
	setDeck,
	searchStyle,
	setSearchStyle,
	setDisplay,
	showing
) => {
	// Function for displaying advance search options
	advanceSearchOptions(e, setSearch, setSearchStyle, search, setDisplay);
	// Function for styling search input component and setting search state with GET request
	getSearchResults(
		e,
		search,
		setSearch,
		searchStyle.width,
		setSearchStyle,
		setDeck,
		showing
	);
	// Function for clicking on search results buttons
	displaySearchResults(e, search, setSearch, setSearchStyle);
	// Function for clicking on deck search component wizard
	displayWizHelp(e, searchStyle.opacity, setSearchStyle);
};

// Function for setting up proper error message
export function setErrMsg(prop, setDeck, setError) {
	// Variable to hold message
	let message = '';

	// Check which error and assign proper message
	if (prop === 'selection') {
		message = 'Please select the deck first before clicking on the add button';
	} else if (prop === 'search') {
		message =
			'No results found. Please try again. Click the wizard for more help.';
	} else if (prop === 'rule') {
		message =
			'No more than 3 copies allowed in a deck. Please try another card.';
	} else if (prop === 'input') {
		message = 'At least 3 or more characters to search.';
	} else if (prop === 'size') {
		message = 'Max deck size reached!';
	} else if (prop === 'extra') {
		message =
			'Only Link, Fusion, Synchro, or XYZ monster are allowed in the extra deck.';
	}
	// Reset error
	setDeck((deck) => {
		const { errMsg } = deck;
		return { ...deck, errMsg: { ...errMsg, [prop]: false } };
	});

	// Display error message
	setError((error) => {
		if (error.display === 'none') {
			return {
				...error,
				msg: [message],
				display: '',
			};
		} else
			return {
				...error,
				msg: [message],
			};
	});
	setTimeout(
		() =>
			setError((error) => {
				return {
					...error,
					display: 'none',
				};
			}),
		2500
	);
}

// Function on checking to see if there is any error messages to display
export function checkErrMsg(errMsg) {
	let display = false;
	// Iterate over all props in the error message object
	for (let prop in errMsg) {
		// Check if prop has a true value, set display to true;
		if (errMsg[prop]) display = errMsg[prop];
	}
	return display;
}

// Onclick handler for the navigation component
export function navClicker(e, show, setter, dis, setSearch, setSearchStyle) {
	const title = e.target.title;
	// Nav has been clicked show nav menu
	if (title === 'nav') {
		if (!show) {
			setter((style) => {
				return {
					...style,
					show: true,
					right: '0',
					zIndex: '1000',
					opacity: 1,
				};
			});
		}
	}
	// close btn clicked or adv option clicked
	else if (title === 'close-btn' || title === 'adv') {
		// display adv search component
		if (title === 'adv') {
			dis((style) => {
				return {
					...style,
					display: 'none',
					display2: '',
					clicked: true,
				};
			});
			// Reset search state when switching to adv search
			setSearch({
				input: '',
				results: '',
				loop: '',
				searching: false,
				radioBtns: {
					cardType: {
						monster: false,
						spell: false,
						trap: false,
					},
					cardOptions: {
						archetype: false,
						type: false,
						attribute: false,
					},
					cardSort: {
						atk: false,
						def: false,
						level: false,
					},
					select1: 'Select CardType',
					select2: 'Select Attribute',
					select3: 'gt',
					select4: 'gt',
					select5: '1',
				},
			});
			setSearchStyle({
				width: '10%',
				transform: '',
				transform1: 'scale(0.7)',
				left: '47%',
				opacity: 0,
				mouth: '',
				disabled: false,
				display: 'none',
				btnDisplay1: 'none',
				btnDisplay2: 'none',
				padding: '',
			});
		}
		// close nav menu
		setter((style) => {
			return {
				...style,
				show: false,
				zIndex: '',
				opacity: 0,
			};
		});
		setTimeout(
			() =>
				setter((style) => {
					return {
						...style,
						right: '-20000px',
					};
				}),
			0
		);
	}
}
// Function for check card type before adding to deck
export function cardChecker(id, del, index, name, selected, cardInfo, state) {
	// Destruct object
	const { deck, setDeck } = state;

	// Check if the button is the Delete button, then perform deletion
	if (id !== 'searchCard') {
		name = name.split(' ')[0].toLowerCase();

		del(index, name);
	}
	// If there has been a selection
	else if (selected !== 'none') {
		// Variables for counting copies, checking deck size, checking if an error occured and if the card needs to go the extra deck
		let count = 0,
			extraDeck = false,
			maxSize = false,
			error = false;
		// Iterate over deck props
		for (let cardDeck in deck) {
			// Check if props is any of the decks
			if (cardDeck === 'main' || cardDeck === 'extra' || cardDeck === 'side') {
				// Check if the deck prop is the selected deck
				if (cardDeck === selected) {
					// Check if the selected deck has reached its max size
					if (cardDeck === 'main' && deck[cardDeck].length === 60)
						maxSize = true;
					else if (cardDeck === 'side' && deck[cardDeck].length === 15)
						maxSize = true;
				}
				// Iterate over all the cards in the deck
				for (let card of deck[cardDeck]) {
					// Count any copies that may be in the deck
					if (card.id === cardInfo.id) count++;
				}
			}
		}
		// Check if any cards are Fusion, Link, XYZ, or Synchro monster...must go to Extra deck per rules
		if (
			cardInfo.type.includes('Fusion') ||
			cardInfo.type.includes('Link') ||
			cardInfo.type.includes('XYZ') ||
			cardInfo.type.includes('Synchro')
		) {
			// Check if there is any space left to add in the extra deck
			if (deck['extra'].length === 15) maxSize = true;
			else if (maxSize) maxSize = false;
			extraDeck = true;
		}
		// if selected deck is the extra deck, and card is not the proper type, send error message
		else if (selected === 'extra' && extraDeck === false) {
			error = true;
			setDeck({
				...deck,
				errMsg: {
					selection: false,
					search: false,
					rule: false,
					extra: true,
				},
			});
		}
		// Check if there are more than 3 copies then display error message
		if (count === 3) {
			setDeck({
				...deck,
				errMsg: { selection: false, search: false, rule: true },
			});
		}
		// if theres less than 3 copies, add card to deck
		else {
			// Check if the card has to go to the extra deck
			if (extraDeck) {
				// Check if extra deck max size has been reached, send error message
				if (maxSize) {
					setDeck({
						...deck,
						errMsg: {
							...deck.errMsg,
							size: [maxSize],
						},
					});
				}
				// Add card to extra deck
				else
					setDeck({
						...deck,
						extra: [...deck.extra, cardInfo],
					});
			}
			// Check if selected deck has reached max size, send error message
			else if (maxSize) {
				setDeck({
					...deck,
					errMsg: {
						...deck.errMsg,
						size: [maxSize],
					},
				});
			}
			// else just add card to selected deck
			else {
				// No errors add card
				if (!error)
					setDeck({
						...deck,
						[selected]: [...deck[selected], cardInfo],
					});
			}
		}
	}
	// Send error message about selection
	else {
		if (deck)
			setDeck({
				...deck,
				errMsg: { selection: true, search: false },
			});
	}
}
// Button onClick handler
export const btnClickHandler = (e, setBtnStyle, id) => {
	// show pop up component
	if (e.target.title === 'View') {
		setBtnStyle((style) => {
			return { ...style, display: '', card: id };
		});
		setTimeout(
			() =>
				setBtnStyle((style) => {
					return {
						...style,
						opacity: 1,
						zIndex: 1000,
					};
				}),
			200
		);
	}
	// hide popup component
	else {
		setBtnStyle((style) => {
			return {
				...style,
				opacity: 0,
				zIndex: -1,
			};
		});
		setTimeout(
			() =>
				setBtnStyle((style) => {
					return {
						...style,
						display: 'none',
						card: null,
					};
				}),
			500
		);
	}
};
