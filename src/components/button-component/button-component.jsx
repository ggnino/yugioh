import React from 'react';
import './button-styles.scss';
import { Link } from 'react-router-dom';

function Button({ btn, link, classy, id = 'null', clicker = '', style }) {
	// Render component
	return (
		<Link
			className={`btn ${classy}`}
			to={link}
			id={id}
			onClick={clicker}
			title={btn}
			style={{ display: style }}
		>
			{btn}
		</Link>
	);
}

export default Button;
