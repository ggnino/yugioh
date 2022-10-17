import React from 'react';
import img1 from '../../imgs/deck-icon.png';
import './deck-items-styles.scss';
import Card from '../card-component/card-component';
import { deckItemsHover } from '../../utils/myHandlerFunctions';

function DeckItems({ title, style, counter, clicker, deck, del, setter }) {
	// Render component
	return (
		<div
			className="deck-items-container"
			onMouseLeave={(e) => deckItemsHover(e, style, setter)}
			onMouseEnter={(e) => deckItemsHover(e, style, setter)}
			title={title}
		>
			<div className="dummy"></div>
			<div
				className="dummy2"
				style={{
					opacity: style.style,
					animationPlayState: style.anima,
				}}
				title={title}
			></div>

			<div className="deck-items" title={title} onClick={clicker}>
				<div className="deck-items-title" title={title}>
					<h3 style={{ color: style.c }} title={title}>
						{title}:
					</h3>
					<div title={title} className="deck-items-counter">
						<img src={img1} title={title} alt="deck-icon" />
						<span title={title}>
							{deck.length || 0}/{counter}
						</span>
					</div>
				</div>
				<div title={title} className="deck-items-cards">
					{deck.length > 0
						? deck.map((card, index) => (
								<Card
									id={'deck'}
									key={`key${index}: ${card.id}`}
									cardInfo={card}
									index={index}
									name={title}
									del={del}
								/>
						  ))
						: ''}
				</div>
			</div>
		</div>
	);
}

export default DeckItems;
