import React, { useContext, useEffect } from 'react';
import './banner-styles.scss';
import Button from '../button-component/button-component';
import img1 from '../../imgs/card-back.jpg';
import img2 from '../../imgs/deck-builder.png';
import img3 from '../../imgs/more-info.jpg';
import { MyContext } from '../../utils/context';

function Banner() {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const { bannerStyle: style, setBannerStyle: setStyle } = state;

	// useEffect hook to apply styling on component mount
	useEffect(() => {
		setStyle({ opacity: 1, transform: 'translateX(0)' });
	}, [setStyle]);

	// Render Component
	return (
		<section className="container banner" style={{ opacity: style.opacity }}>
			<div className="banner-game-info" style={{ transform: style.transform }}>
				<img id="card-front" src={img1} alt="card-front-img" />
				<img id="card-back" src={img3} alt="card-back-img" />
				<h2>Yu-gi-oh tcg info</h2>
				<Button btn="More Info" link="card-game-info" classy="btn-banner" />
			</div>
			<div
				className="banner-deck-builder"
				style={{ transform: style.transform }}
			>
				<img src={img2} alt="deck-builder-banner-img" />
				<h2>Deck Builder</h2>
				<Button btn="Build" link="deck-builder" />
			</div>
		</section>
	);
}

export default Banner;
