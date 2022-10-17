import React, { useEffect, useContext } from 'react';
import img2 from '../../imgs/kuriboh.png';
import SearchInput from '../search-input-component/search-component';
import SearchResults from '../search-results-component/search-results-component';
import DeckSearchHelp from '../deck-search-help-component/deck-search-help';
import './advance-search-styles.scss';
import LoadingComponent from '../loading-component/loading-component';
import { MyContext } from '../../utils/context';

function AdvanceSearch({
	clicker,
	inputHandler,
	displayResults,
	selectHandler,
}) {
	// useContext hook for state
	const state = useContext(MyContext);

	// Destructuring state
	const {
		info,
		setInfo,
		search,
		loading: loader,
		setLoading: setLoader,
		display2: display,
		searchStyle: style,
		setSearchStyle,
	} = state;

	// Destructuring state objs
	const { radioBtns, searching } = search;
	const { cardType, cardOptions, cardSort } = radioBtns;
	const { monster, trap, spell } = cardType;
	const { archetype, type, attribute } = cardOptions;

	// useEffect hook for setting and loading
	useEffect(() => {
		// While searching is going on show loading component
		if (searching) {
			setLoader({
				loadingDisplay: 'initial',
				loadingDisplay2: 'none',
			});
		}
		// Hide loading component
		else if (!searching) {
			setLoader({
				loadingDisplay: 'none',
				loadingDisplay2: 'initial',
			});
		}
		// Monster selection is true set select elements data and styling
		if (monster) {
			setInfo((info) => {
				return {
					...info,
					select1: [
						'Aqua',
						'Beast',
						'Beast-Warrior',
						'Creator-God',
						'Cyberse',
						'Dinosaur',
						'Divine-Beast',
						'Dragon',
						'Fairy',
						'Fiend',
						'Fish',
						'Insect',
						'Machine',
						'Plant',
						'Psychic',
						'Pyro',
						'Reptile',
						'Rock',
						'Sea Serpent',
						'Spellcaster',
						'Thunder',
						'Warrior',
						'Winged Beast',
					],
					select2: [
						'Dark',
						'Divine',
						'Earth',
						'Fire',
						'Light',
						'Water',
						'Wind',
					],
					display: '',
					display3: '',
				};
			});
			setTimeout(
				() =>
					setInfo((info) => {
						return {
							...info,
							opacity: 1,
							opacity2: 0,
							opacity3: 1,
						};
					}),
				0
			);
			// Archetype,type, or attribute is selelcted set sort element data and styling
			if (archetype || type || attribute) {
				setInfo((info) => {
					return { ...info, display2: '' };
				});
				setTimeout(
					() =>
						setInfo((info) => {
							return {
								...info,
								sort: ['gt', 'gte', 'lt', 'lte'],
								opacity2: 1,
							};
						}),
					0
				);
			} else {
				setInfo((info) => {
					return {
						...info,
						opacity2: 0,
					};
				});
				setTimeout(
					() =>
						setInfo((info) => {
							return { ...info, display2: 'none' };
						}),
					0
				);
			}
		}
		// if trap or spell selection is true, set selected element data and styling
		else {
			let selectArr = [];
			if (trap) {
				selectArr = ['Normal', 'Continuous', 'Counter'];
			} else if (spell) {
				selectArr = [
					'Normal',
					'Continuous',
					'Field',
					'Equip',
					'Ritual',
					'Quick-Play',
				];
			}
			if (trap || spell) {
				setInfo((info) => {
					return {
						...info,
						select1: selectArr,
						opacity2: 0,
						opacity3: 0,
						display3: '',
					};
				});
				setTimeout(
					() =>
						setInfo((info) => {
							return {
								...info,
								opacity: 1,
								display: 'none',
								display2: 'none',
							};
						}),
					100
				);
			}
		}
	}, [
		monster,
		trap,
		spell,
		archetype,
		type,
		attribute,
		searching,
		setInfo,
		setLoader,
		search,
		setSearchStyle,
	]);

	// Render component
	return (
		<div
			className="advance-search"
			style={{ display }}
			onClick={clicker}
			onKeyDown={clicker}
		>
			<img
				title="kuriboh-help"
				className="advance-search-img"
				src={img2}
				alt="kuriboh-img"
			/>
			<DeckSearchHelp
				opacity={style.opacity}
				display={style.display}
				title={'advance'}
			/>
			<div className="advance-search-radio-container">
				<div className="advance-search-radio-btns">
					<h3>Card-Type:</h3>
					<label>
						<input
							type="radio"
							name="search"
							readOnly
							checked={cardType.monster}
						/>
						Monster
						<span className="custom-radio" title="monster"></span>
					</label>

					<label>
						<input
							type="radio"
							name="search"
							readOnly
							checked={cardType.trap}
						/>
						Trap
						<span className="custom-radio" title="trap"></span>
					</label>

					<label>
						<input
							type="radio"
							name="search"
							readOnly
							checked={cardType.spell}
						/>
						Spell
						<span className="custom-radio" title="spell"></span>
					</label>
				</div>
				<div
					className="advance-search-radio-options"
					style={{ opacity: info.opacity, display: info.display3 }}
				>
					<h3>Card Options</h3>

					<label>
						<input
							type="radio"
							name="types"
							readOnly
							checked={cardOptions.archetype}
						/>
						Archetype
						<span className="custom-radio" title="archetype"></span>
					</label>

					<label>
						<input
							type="radio"
							value={radioBtns.select1}
							name="type"
							readOnly
							checked={cardOptions.type}
						/>
						Type<span className="custom-radio" title="type"></span>
					</label>
					<select
						title="select1"
						value={radioBtns.select1}
						onChange={selectHandler}
					>
						<option hidden>{radioBtns.select1}</option>
						{info.select1.map((value, index) => (
							<option key={`infoKey:${index}`} value={value}>
								{value}
							</option>
						))}
					</select>

					<label style={{ display: info.display, opacity: info.opacity3 }}>
						<input
							type="radio"
							value={radioBtns.select2}
							title="attribute"
							readOnly
							checked={cardOptions.attribute}
						/>
						Attribute<span className="custom-radio"></span>
					</label>
					<select
						title="select2"
						name="attributex"
						value={radioBtns.select2}
						id="attribute"
						onChange={selectHandler}
						style={{ display: info.display, opacity: info.opacity3 }}
					>
						<option hidden>{radioBtns.select2}</option>
						{info.select2.map((value, index) => (
							<option key={`select2Key: ${index}`} value={value}>
								{value}
							</option>
						))}
					</select>
				</div>
				<div
					className="advance-search-sort-options"
					style={{ display: info.display2, opacity: info.opacity2 }}
				>
					<h3>Sort</h3>

					<label>
						<input
							type="radio"
							value={radioBtns.select3}
							name="sort"
							title="atk"
							readOnly
							checked={cardSort.atk}
						/>
						atk<span className="custom-radio"></span>
					</label>
					<select
						value={radioBtns.select3}
						name="atk"
						title="atkx"
						id="atk"
						onChange={selectHandler}
					>
						{info.sort.map((value, index) => (
							<option key={`atkKey:${index}`} value={value}>
								{value}
							</option>
						))}
					</select>

					<label>
						<input
							type="radio"
							value={radioBtns.select4}
							title="def"
							name="sort"
							readOnly
							checked={cardSort.def}
						/>
						def<span className="custom-radio"></span>
					</label>
					<select
						value={radioBtns.select4}
						name="def"
						title="defx"
						id="def"
						onChange={selectHandler}
					>
						{info.sort.map((value, index) => (
							<option key={`defKey:${index}`} value={value}>
								{value}
							</option>
						))}
					</select>

					<label>
						<input
							type="radio"
							name="level"
							title="level"
							value={radioBtns.select5}
							readOnly
							checked={cardSort.level}
						/>
						Level<span className="custom-radio"></span>
					</label>
					<input
						value={radioBtns.select5}
						onChange={selectHandler}
						type="number"
						max="12"
						min="1"
						title="levelx"
					/>
				</div>
			</div>
			<SearchInput style={style} value={search.input} input={inputHandler} />
			<LoadingComponent display={loader.loadingDisplay} />
			<SearchResults
				displayResults={displayResults}
				display={info.loadingDisplay2}
				search={search}
				btnDisplay1={style.btnDisplay1}
				btnDisplay2={style.btnDisplay2}
			/>
		</div>
	);
}

export default AdvanceSearch;
