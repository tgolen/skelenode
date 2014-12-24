'use strict';

var SkelenodeModel = require('skelenode-model');

module.exports = function(options) {
	var Model = new SkelenodeModel(options);

	Model.setSwagger({
			method: 'GET',
			path: '/api/v1/hello/world',
			nickname: 'hello_world'
		}, function(req, res, next) {
			res.send('Hello World!');
			next();
		});

	return Model;
};