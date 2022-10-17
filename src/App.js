import React, { useState } from 'react';
import './app.scss';
import Banner from './components/banner-component/banner-component';
import InfoPageComponent from './components/info-page-component/info-page-component';
import DeckBuilder from './components/deck-builder-component/deck-builder-component';
import NavComponent from './components/navigation-component/nav-component';
import { Routes, Route } from 'react-router-dom';
import { MyContext } from './utils/context';

function App() {
	// Banner Component
	// useState hook for banner styling
	const [bannerStyle, setBannerStyle] = useState({
		opacity: 0,
		transform: '',
	});

	// Nav Component
	// useState hook for nav styling
	const [style, SetStyle] = useState({
		display: '',
		display2: 'none',
		clicked: false,
	});
	const [navStyle, setNavStyle] = useState({
		show: false,
		right: '-20000px',
		width: '0',
		height: '0',
		zIndex: '',
		opacity: 0,
		display: '',
	});

	//Info page component
	const [infoStyle, setInfoStyle] = useState({ opacity: 0 });

	//Deck builder component
	// useState hook for search input,adv search selection and search results
	const [search, setSearch] = useState({
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
	// Search component
	// useState hook for search styling/animations
	const [searchStyle, setSearchStyle] = useState({
		width: '10%',
		transform: '',
		transform1: 'scale(0.7)',
		left: '47%',
		opacity: 0,
		mouth: '',
		disabled: true,
		display: 'none',
		btnDisplay1: 'none',
		btnDisplay2: 'none',
		padding: '',
	});

	// Advance search component
	// useState hook for displaying correct selection info
	const [info, setInfo] = useState({
		select1: [],
		select2: [],
		sort: [],
		opacity: 0,
		opacity2: 0,
		opacity3: 0,
		display: '',
		display2: 'none',
		display3: 'none',
	});

	// Deck Items Component
	// useState hook for applying different selection styles
	const [deckBuilderstyle, setDeckBuilderStyle] = useState({
		opacity: 0,
		opacity1: 0,
		opacity2: 0,
		opacity3: 0,
		anima1: 'paused',
		anima2: 'paused',
		anima3: 'paused',
		color1: '',
		color2: '',
		color3: '',
	});

	// useState hook for setting up deck info and setting up any error messages
	const [deck, setDeck] = useState({
		main: [],
		extra: [],
		side: [],
		selected: 'none',
		errMsg: {
			selection: false,
			search: false,
			rule: false,
			input: false,
			extra: false,
			size: false,
		},
	});

	// Deck Search Help component
	// useState hook for changing the help text
	const [message, setMessage] = useState('');

	//Button Component
	// useState hook for button styling and button info
	const [btnInfo, setBtnInfo] = useState({ 1: 'View', 2: 'Add', 3: 'Delete' });
	const [btnStyle, setBtnStyle] = useState({
		display: 'none',
		opacity: 0,
		zIndex: -1,
		card: 'null',
	});
	//Error component
	// useState hook for displaying different error messages
	const [error, setError] = useState({
		msg: '',
		display: '',
	});

	//Loading component
	// useState hook for displaying loading animation
	const [pageStyle, setPageStyle] = useState({ opacity: 0 });
	const [loading, setLoading] = useState({
		loadingDisplay: '',
		loadingDisplay2: 'none',
	});
	// Render app components
	return (
		<MyContext.Provider
			value={{
				bannerStyle,
				setBannerStyle,
				btnStyle,
				setBtnStyle,
				message,
				setMessage,
				display: style.display,
				display2: style.display2,
				clicked: style.clicked,
				setDisplay: SetStyle,
				info,
				setInfo,
				style: deckBuilderstyle,
				setStyle: setDeckBuilderStyle,
				searchStyle,
				setSearchStyle,
				deck,
				setDeck,
				search,
				setSearch,
				navStyle,
				setNavStyle,
				error,
				setError,
				infoStyle,
				setInfoStyle,
				loading,
				setLoading,
				pageStyle,
				setPageStyle,
				btnInfo,
				setBtnInfo,
			}}
		>
			<Routes>
				<Route path="/card-game-info" element={<NavComponent />} />
				<Route path="/deck-builder" element={<NavComponent />} />
			</Routes>

			<Routes>
				<Route exact path="/" element={<Banner />} />
				<Route path="/card-game-info" element={<InfoPageComponent />} />
				<Route path="/deck-builder" element={<DeckBuilder />} />
			</Routes>
		</MyContext.Provider>
	);
}

export default App;
