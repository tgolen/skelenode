'use strict';

var glob = require('glob'),
	path = require('path'),
	_ = require('lodash'),
	swagger = require('swagger-node-restify'),
	swaggerMethodName = {
		get: 'addGet',
		put: 'addPut',
		post: 'addPost',
		delete: 'addDelete'
	};

exports.init = init;

/**
 * gets all files that have a pattern of <http_verb>.<anything>.js
 * it will then add those to swagger as the proper resource
 *
 * @author Tim Golen 2014-12-17
 *
 * @param  {Function} cb
 */
function init(cb) {
	glob(__dirname + '/**/+(get|post|put|delete).*.js', function(err, files) {
		if (err) return cb && cb(err);

		_(files).forEach(function(file) {
			var filename = _.last(file.split('/')),
				verb = _.first(filename.split('.'));
			swagger[swaggerMethodName[verb]](require(file));
		});
	});
}