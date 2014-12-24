'use strict';

var fs = require('fs'),
	_ = require('lodash'),
	config = require('config'),
	compiledTemplate = _.template(fs.readFileSync(__dirname + '/templates/index.html').toString());

module.exports = function(req, res, next) {
	var body = compiledTemplate({
		env: config.get('env'),
		host: config.get('host')
	});
	res.writeHead(200, {
		'Content-Length': Buffer.byteLength(body),
		'Content-Type': 'text/html'
	});
	res.write(body);
	res.end();
};