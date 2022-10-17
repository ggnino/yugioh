import React, { useEffect, useContext } from 'react';
import './nav-component-styles.scss';
import navIcon from '../../imgs/nav-icon.png';
import NavMenu from '../nav-menu-component/nav-menu-component';
import { navClicker } from '../../utils/myHandlerFunctions';
import { MyContext } from '../../utils/context';

function NavComponent() {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const { navStyle, setNavStyle, setDisplay, setSearchStyle, setSearch } =
		state;
	// Destructuring nav styling obj
	const { show, display, right, opacity, zIndex } = navStyle;
	// useEffect hook for displaying and hiding the nac
	useEffect(() => {
		if (window.location.pathname === '/card-game-info') {
			setNavStyle((s) => {
				return {
					...s,
					display: 'none',
				};
			});
		} else {
			setNavStyle((s) => {
				return {
					...s,
					display: '',
				};
			});
		}
	}, [setNavStyle]);
	// Render component
	return (
		<div
			className="nav"
			onClick={(e) =>
				navClicker(e, show, setNavStyle, setDisplay, setSearch, setSearchStyle)
			}
		>
			<img style={{ zIndex }} src={navIcon} alt="nav-icon" title="nav" />
			<NavMenu display={display} right={right} opacity={opacity} />
		</div>
	);
}

export default NavComponent;
