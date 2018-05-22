import React from 'react';

export default function removeButton(props) {
	return <button className="removeButton" onClick={()=> props.removeFromCart(props.cartItem)}>Remove
			</button>
};