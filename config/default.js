'use strict';

module.exports = {
	host: 'localhost',
	port: 80,
	env: process.env.NODE_ENV || 'development',
	logger: {
		audit: {
			enabled: false
		}
	}
};