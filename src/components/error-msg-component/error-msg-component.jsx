import React, { useEffect, useContext } from 'react';
import { setErrMsg } from '../../utils/myHandlerFunctions';
import './error-msg-styles.scss';
import { MyContext } from '../../utils/context';

function ErrorMsg({ err, opacity = 0, setDeck }) {
	// useContext hook for state
	const state = useContext(MyContext);
	// Destructuring state
	const { error, setError } = state;
	// useEffect hook for checking which error message to display
	useEffect(() => {
		// Check if its a selection error, display selection error
		if (err.selection) setErrMsg('selection', setDeck, setError);
		// Check if its a search error, display search error
		else if (err.search) setErrMsg('search', setDeck, setError);
		// Check if its a card rule error, display card rule error
		else if (err.rule) setErrMsg('rule', setDeck, setError);
		// Check if its a input error, display input error
		else if (err.input) setErrMsg('input', setDeck, setError);
		// Check if its a max size error, display max size error
		else if (err.size) setErrMsg('size', setDeck, setError);
		// Check if its a extra deck error, display extra deck error
		else if (err.extra) setErrMsg('extra', setDeck, setError);
	}, [err, setDeck, setError]);

	// Render component
	return (
		<div className="error-msg" style={{ opacity, display: error.display }}>
			<p>{error.msg}</p>
		</div>
	);
}

export default ErrorMsg;
