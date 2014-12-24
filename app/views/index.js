'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	compiledTemplate = _.template(fs.readFileSync(__dirname + '/templates/index.html').toString());

module.exports = function(req, res, next) {
	var body = compiledTemplate();
	res.writeHead(200, {
		'Content-Length': Buffer.byteLength(body),
		'Content-Type': 'text/html'
	});
	res.write(body);
	res.end();
};