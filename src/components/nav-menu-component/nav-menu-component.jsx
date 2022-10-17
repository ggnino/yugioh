import React from 'react';
import CloseButton from '../close-button-component/close-button-component';
import './nav-menu-styles.scss';

function NavMenu({ right, opacity, display }) {
	// Render component
	return (
		<div className="nav-menu" style={{ right, opacity }}>
			<CloseButton />
			<ul>
				<li>
					<a href="/">
						<span>Home</span>
					</a>
				</li>
				<li>
					<a href="/card-game-info">
						<span>TCG Info</span>
					</a>
				</li>
				<li>
					<a href="/deck-builder">
						<span>Deck Builder</span>
					</a>
				</li>
				<li style={{ display }}>
					<span title="adv">Adv Deck Builder</span>
				</li>
			</ul>
		</div>
	);
}

export default NavMenu;
