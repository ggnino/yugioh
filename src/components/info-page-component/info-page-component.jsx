import React, { useContext, useEffect } from 'react';
import './info-page-styles.scss';
import vid from '../../imgs/yugi-match1.mp4';
import img1 from '../../imgs/dark-magician-card.png';
import img2 from '../../imgs/dark-magician-girl-card.jpg';
import { MyContext } from '../../utils/context';

function InfoPageComponent() {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const { infoStyle, setInfoStyle } = state;
	// useEffect hook apply styles on component mount
	useEffect(() => {
		if (window.innerWidth <= 960) {
			setInfoStyle({
				opacity: 1,
				transH1: 'translateX(0)',
				transVid: 'translateY(0)',
				transImg1: 'skewY(0deg) translateX(0)',
				transImg2: 'skewY(0deg) translateX(0)',
			});
		} else
			setInfoStyle({
				opacity: 1,
				transH1: 'translateX(0)',
				transVid: 'translateY(0)',
				transImg1: 'skewY(-10deg) translateX(0)',
				transImg2: 'skewY(10deg) translateX(0)',
			});
	}, [setInfoStyle]);

	// Render component
	return (
		<section
			className="container info-page"
			style={{ opacity: infoStyle.opacity }}
		>
			<div className="info-page-content">
				<h1
					style={{ opacity: infoStyle.opacity, transform: infoStyle.transH1 }}
				>
					Yu-Gi-Oh! Trading Card Game
				</h1>

				<video
					autoPlay
					loop
					style={{ opacity: infoStyle.opacity, transform: infoStyle.transVid }}
				>
					<source src={vid} type="video/mp4" />
				</video>
				<div className="info-page-content-imgs">
					<img
						style={{
							opacity: infoStyle.opacity,
							transform: infoStyle.transImg1,
						}}
						src={img2}
						alt=""
						id="m1"
					/>
					<p style={{ opacity: infoStyle.opacity }}>
						In the trading card game, players draw cards from their respective
						decks and take turns playing cards onto "the field". Each player
						uses a deck containing forty to sixty cards, and an optional "Extra
						Deck" of up to fifteen cards. There is also an optional fifteen card
						side deck, which allows players to swap cards from their main deck
						and/or extra deck between games. Players are restricted to three of
						each card per deck and must follow the Forbidden/Limited card list,
						which restricts selected cards by Konami to be limited to two, one,
						or zero. Each player starts with 8,000 (or 4,000 in speed duel)
						"Life Points", with the main aim of the game to use monster attacks
						and spells to reduce the opponent's Life Points. The game ends upon
						reaching one of the following conditions: A player loses if their
						Life Points reaches zero. If both players reach zero Life Points at
						the same time, the game ends in a draw. A player loses if they are
						required to draw a card, but has no more cards to draw in the Main
						Deck. Certain cards have special conditions which trigger an
						automatic win or loss when its conditions are met (e.g. having all
						five cards of Exodia the Forbidden One in the hand or all five
						letters of the Destiny Board on the field). A player can forfeit at
						any time.
					</p>
					<img
						style={{
							opacity: infoStyle.opacity,
							transform: infoStyle.transImg2,
						}}
						src={img1}
						alt=""
						id="m2"
					/>
				</div>
			</div>
		</section>
	);
}

export default InfoPageComponent;
