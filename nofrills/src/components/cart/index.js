import React from 'react'
import { connect } from 'react-redux'

function sort(items) {
  return items.sort((a, b) => a.id < b.id);
}

function basketTotal(props) {
  const total = props.cart.map(item => {
    return item.quantity * parseFloat(item.price).toFixed(2)
  }).reduce((a, b) => {
    return a + b}, 0);

  const appliedDiscount = applyDiscount(props);

  return (total - appliedDiscount).toFixed(2);
}

function applyDiscount(props) {
   const fruitTeaDiscount = props.cart.filter(item => item.id === 1).map(el => {
    if(el.quantity >= 2) {
       const bogof = el.quantity % 2 === 0 ? ((el.quantity /2) * el.price) : ((el.quantity - 1) / 2) * el.price;
      return bogof;
    }
  });
  const strawberryDiscount = props.cart.filter(item => item.id === 2).map(el => {
    if(el.quantity >= 3) {
      return (el.quantity * 0.5);
    }
  });
  return strawberryDiscount + fruitTeaDiscount;

}

function Cart(props) {
  return <table className="cart">
  	<thead>
  		<tr>
  			<th>Item</th>
  			<th>Quantity</th>
  			<th>Subtotal</th>
  		</tr>
  	</thead>

  	<tbody>
  		{
  			sort(props.cart).map((item, key) => <tr key={key}> 
  				<td>{item.name}</td>
  				<td className="quantity"><button onClick={(e) => props.removeFromCart(item)}>-</button>
  				{item.quantity}
  				<button onClick={(e) => props.addToCart(item)}>+</button>
  				</td>
  				<td>{item.currency}{item.quantity * Number(item.price).toFixed(2)}</td>
  				</tr>)
  		}
      <tr><td>Discount applied</td>
      <td></td>
      <td>£{applyDiscount(props) ? applyDiscount(props) : 0}</td>
      </tr>
  		<tr>
      <td>
      <strong> Basket Total</strong>
      </td>
      <td></td>
        <td>£{basketTotal(props)}</td>
      </tr>

  	</tbody>
  	</table>

}

function mapStateToProps(state) {
	return {
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (item) => {
			dispatch({type: 'ADD', payload: item })
		},
		removeFromCart: (item) => {
			dispatch({type: 'REMOVE', payload: item })
		}
	}
}
   

export default connect(mapStateToProps, mapDispatchToProps)(Cart)