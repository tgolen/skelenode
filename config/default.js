'use strict';

var sh = require('execSync'),
	hash = sh.exec('git rev-parse HEAD').stdout || '';

module.exports = {
	host: 'localhost',
	port: 80,
	env: process.env.NODE_ENV || 'development',
	githash: hash.substring(0,7),
	logger: {
		audit: {
			enabled: false
		}
	}
};