import React from 'react';
import AddButton from './addButton';
import RemoveButton from './removeButton';


export default function productListItem(props) {
	return <div className="product-list-item">
		<img 
		width={200}
		title={props.product.name}
		src={`products/${props.product.image}`}
		/>

		<h3> {props.product.name} </h3>
		<div>{props.product.currency} {props.product.price}</div>
		<div className="groupButton">
			<AddButton cartItem={props.cartItem} product={props.product} addToCart={props.addToCart}/>
			{props.cartItem ? 
			<RemoveButton cartItem={props.cartItem} product={props.product} removeFromCart={props.removeFromCart}/> : null}
		</div>
	</div>
};