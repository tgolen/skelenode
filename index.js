'use strict';

/**
* Module dependencies.
*/
var chalk = require('chalk'),
	packageJSON = require('./package.json'),
	config = require('config');

// Logging initialization
console.log(chalk.cyan('[%s] Application started on port %s in %s environment.'),
	packageJSON.name.toUpperCase(),
	chalk.underline(config.get('port')),
	chalk.underline(config.util.getEnv('NODE_ENV')));
