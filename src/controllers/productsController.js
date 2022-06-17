const fs = require('fs');
const path = require('path');
const { off } = require('process');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		res.render( 'products', { products, toThousand } );

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		const id = +req.params.id;
		let percent;

		let productDetail = products.filter( function( product ){

			return product.id === id;

		});

		productDetail = productDetail[ 0 ];
		percent       = ( productDetail.discount < 10 ) ? '0.0'+productDetail.discount : '0.'+productDetail.discount;
		
		productDetail.totalPrice = productDetail.price - ( productDetail.price*parseFloat( percent ) );

		res.render( 'detail', { title: productDetail.name, productDetail, toThousand } );

	},

	// Create - Form to create
	create: (req, res) => {
		
		res.render( 'product-create-form' );

	},
	
	// Create -  Method to store
	store: (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = products.length + 1;

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;

		let newProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description

		};

		products.push( newProduct );

		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );

		res.redirect( '/' );

	},

	// Update - Form to edit
	edit: (req, res) => {
		
		const id = +req.params.id;

		let productDetail = products.filter( function( product ){

			return product.id === id;

		});

		productDetail = productDetail[ 0 ];

		res.render( 'product-edit-form', { title: productDetail.name, productToEdit: productDetail } );

	},
	// Update - Method to update
	update: (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let name        = req.body.name;
		let price       = req.body.price;
		let discount    = req.body.discount;
		let category    = req.body.category;
		let description = req.body.description;

		let editProduct = {

			id: id,
			name: name,
			price: price,
			discount: discount,
			category: category,
			description: description

		};	

		for( let i in products ) {

			if( products[ i ].id === id ) {

				products[ i ] = editProduct;
				break;

			}

		}

		fs.writeFileSync( productsFilePath , JSON.stringify( products ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let products = JSON.parse( fs.readFileSync( productsFilePath, 'utf-8' ) );
		const id     = +req.params.id;

		let productDestroyed = products.filter( function( product ){

			return product.id !== id;

		});

		console.log( productDestroyed );

		fs.writeFileSync( productsFilePath , JSON.stringify( productDestroyed ), { encoding: 'utf-8' } );
		res.redirect( '/' );

	}
};

module.exports = controller;