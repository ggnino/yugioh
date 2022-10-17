import React, { useContext } from 'react';
import img1 from '../../imgs/dark-magician-card.png';
import './card-component.scss';
import Button from '../button-component/button-component';
import Popup from '../popup-component/popup-component';
import { cardChecker, btnClickHandler } from '../../utils/myHandlerFunctions';
import { MyContext } from '../../utils/context';

const Card = ({
	id,
	decks = '',
	cardInfo,
	selected = '',
	index,
	name = 'search-result',
	del,
}) => {
	// useContext hook for state
	const state = useContext(MyContext);

	// Destructuring btn info from state
	const { btnInfo, btnStyle, setBtnStyle } = state;
	// Destructuring btn styling
	const { display, opacity, zIndex, card } = btnStyle;

	// Render component
	return (
		<div className="card" id={id} title={name}>
			<img
				title={name}
				src={cardInfo.card_images ? cardInfo.card_images[0].image_url : img1}
				alt=""
			/>
			<Popup
				key1={`card-key:${id}${id.length}`}
				display={card === cardInfo.name ? display : 'none'}
				opacity={card === cardInfo.name ? opacity : 0}
				zIndex={card === cardInfo.name ? zIndex : -1}
				clicker={(e) => btnClickHandler(e, setBtnStyle)}
				info={cardInfo}
			/>
			<div className="card-btns">
				<Button
					btn={btnInfo[1]}
					link="#"
					classy="card-btn"
					clicker={(e) => btnClickHandler(e, setBtnStyle, cardInfo.name)}
				/>
				<Button
					btn={id === 'searchCard' ? btnInfo[2] : btnInfo[3]}
					clicker={() =>
						cardChecker(id, del, index, name, selected, cardInfo, decks)
					}
					link="#"
					classy="card-btn"
					id={id === 'searchCard' ? btnInfo[2] : btnInfo[3]}
				/>
			</div>
		</div>
	);
};

export default Card;
