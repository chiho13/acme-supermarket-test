import React from 'react';
import ProductListing from '../components/product-listing';

import data from '../data/products.json';

const Homepage = (props) => {
	return <div>
			<h2>No Frills</h2>
			<ProductListing products={data.products} />
		</div>
};

export default Homepage;