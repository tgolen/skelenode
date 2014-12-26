'use strict';

var SkelenodeModel = require('skelenode-model');

module.exports = function(options) {
	var Model = new SkelenodeModel(options);

	Model.setSwagger({
			method: 'GET',
			path: '/api/v1/hello/world',
			nickname: 'hello_world'
		}, function(req, res, next) {
			Model.swr.success({ msg: 'Hello World!' }, res);
			next();
		});

	return Model;
};