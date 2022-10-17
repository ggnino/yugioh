import React from 'react';
import './popup-styles.scss';
import CloseButton from '../close-button-component/close-button-component';

function Popup({ opacity, clicker, zIndex, info, key1, display }) {
	// Destruct all props from the card information
	const {
		name,
		type,
		level,
		attribute,
		card_images: imgs,
		atk,
		def,
		desc,
		race,
		card_prices: prices,
	} = info;

	// Array for displaying web stores
	const marketArr = [
		'Card Market',
		'Tcgplayer',
		'Ebay',
		'Amazon',
		'Coolstuffinc',
	];
	// Array for sending user to proper web store for card purchase
	const links = [
		`https://www.cardmarket.com/en/YuGiOh/Products/Search?searchString=${name}`,
		`https://www.tcgplayer.com/search/all/product?q=${name}`,
		`https://www.ebay.com/sch/i.html?_nkw=${name}`,
		`https://www.amazon.com/s?k=${name}`,
		`https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=${name}`,
	];

	// Render component
	return (
		<div
			className=" popup"
			style={{
				opacity,
				display,
				zIndex,
			}}
		>
			<img src={imgs ? imgs[0].image_url : 'IMG FAILED!'} alt="" />
			<CloseButton clicker={clicker} />
			<div className="popup-card-info">
				<h2>{name || 'Card Title'}</h2>
				<h3 id="label">Type:</h3>
				<p> {`${race}/${type}`}</p>
				<h3>Level:</h3>
				<p>{level || ''}</p>
				<h3>Attribute:</h3>
				<p>{attribute || ''}</p>
				<h3>Attack:</h3>
				<p>{atk || ''}</p>
				<h3>Defense:</h3>
				<p>{def || ''}</p>
				<h3>Descripition:</h3>
				<p id="desc">
					{desc ||
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas ex enim tempora dolores corrupti rerum impedit magni omnis, facere officia voluptatum harum dolor qui dignissimos architecto necessitatibus. Expedita natus quis error quo hic sapiente. Laboriosam voluptatibus sint tenetur architecto!'}
				</p>
				<h3>Price:</h3>
				{prices
					? Object.keys(prices[0]).map((e, index) => {
							const price = `${marketArr[index]}: $${prices[0][e]}\n`;
							return (
								<a
									target="_blank"
									rel="noreferrer"
									href={links[index]}
									key={`${key1} ${index}`}
								>
									{price}
								</a>
							);
					  })
					: 21}
			</div>
		</div>
	);
}

export default Popup;
