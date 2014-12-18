'use strict';

/**
* Module dependencies.
*/
var chalk = require('chalk'),
	packageJSON = require('./package.json'),
	config = require('config'),
	restify = require('restify'),
	swagger = require('swagger-node-restify'),
	routes = require('./app/routes/index');

var app = restify.createServer();
app.use(restify.bodyParser());

app.use(function(req, res, next){
	req.url = req.url.replace(/^\/api\/v1/,'');
	next(req, res);
});

swagger.setAppHandler(app);
swagger.configure('http://petstore.swagger.wordnik.com', '0.1');
swagger.configureSwaggerPaths('', '/api-docs', '');

routes.init();

app.listen(config.get('port'));

// Logging initialization
console.log(chalk.cyan('[%s] Application started on port %s in %s environment.'),
	packageJSON.name.toUpperCase(),
	chalk.underline(config.get('port')),
	chalk.underline(config.util.getEnv('NODE_ENV')));