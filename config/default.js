'use strict';

module.exports = {
	host: 'localhost',
	port: 80,
	env: process.env.NODE_ENV || 'development',
	githash: '',
	db: {
		redis: {
			port: 6379,
			host: '127.0.0.1',
			password: null
		}
	},
	dispatcher: {
		debug: true
	},
	logger: {
		audit: {
			enabled: false
		}
	}
};