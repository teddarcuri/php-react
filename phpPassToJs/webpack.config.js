var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./js/app.js'
	],
	output: {
		path: path.join(__dirname, 'js'),
		filename: "bundle.js",
		publicPath: '/js/'
	},
	module: {
		loaders: [
			// ES6 + JSX 
			{
				test: /\.js?$/,
				loader: 'babel',
				include: path.join(__dirname, 'js'),
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
}