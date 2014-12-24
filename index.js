'use strict';

/**
* Module dependencies.
*/
var chalk = require('chalk'),
	packageJSON = require('./package.json'),
	config = require('config'),
	restify = require('restify'),
	bunyan = require('bunyan'),
	swagger = require('swagger-node-restify'),
	skelenodeModelLoader = require('skelenode-model-loader');

// create our server
var app = restify.createServer({
	log: bunyan.createLogger({
		name: packageJSON.name,
		stream: process.stdout
	})
});

// add appropriate middleware
app.use(restify.bodyParser());

// turn on an audit logger if we need to
if (config.get('logger.audit.enabled')) {
	app.on('after', restify.auditLogger({
		log: bunyan.createLogger({
			name: packageJSON.name + '_audit',
			stream: process.stdout
		})
	}));
}

app.get('/', require('./app/views/index'));

// configure swagger
swagger.setAppHandler(app);
swagger.configure('http://petstore.swagger.wordnik.com', '0.1');
swagger.configureSwaggerPaths('', '/api-docs', '');

// load all of our models
skelenodeModelLoader.init(__dirname + '/app/models');

// startup our server
app.listen(config.get('port'));
console.log(chalk.cyan('[%s] Application started on port %s in %s environment.'),
	packageJSON.name.toUpperCase(),
	chalk.underline(config.get('port')),
	chalk.underline(config.util.getEnv('NODE_ENV')));