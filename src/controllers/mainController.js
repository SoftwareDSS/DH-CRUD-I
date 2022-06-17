const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = ( n ) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		
		const visitedProducts = products.filter( function( product ) {

			return product.category === 'visited';

		});

		const inSaleProducts = products.filter( function( product ) {

			return product.category === 'in-sale';

		});

		/* 
				let visitedProducts = [];
				for( let i = 0; i < products.length; i++ ) {

					if( products[ i ].category === 'visited' ) {

						visitedProducts.push( products[ i ] );

					}

				}

				let inSaleProdcuts = [];
				for( let i = 0; i < products.length; i++ ) {

					if( products[ i ].category === 'in-sale' ) {

						inSaleProdcuts.push( products[ i ] );

					}

				}

		*/

		res.render( 'index', { visitedProducts, inSaleProducts, toThousand } );

	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
