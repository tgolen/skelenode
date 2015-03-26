'use strict';

/**
* Module dependencies.
*/
var chalk = require('chalk'),
	packageJSON = require('./package.json'),
	config = require('config'),
	restify = require('restify'),
	bunyan = require('bunyan'),
	morgan = require('morgan'),
	swagger = require('swagger-node-restify'),
	skelenodeModelLoader = require('skelenode-model/loader'),
	skelenodeSocket = require('skelenode-socket');

exports.start = start;

function start(options) {
	// create our server
	var app = restify.createServer({
			log: bunyan.createLogger({
				name: packageJSON.name,
				stream: process.stdout
			})
		}),
		options = options || {};

	// setup some of our config options
	if (!options.pathToViews) {
		options.pathToViews = __dirname + '/../../app/views';
	}
	if (!options.pathToModels) {
		options.pathToModels = __dirname + '/../../app/models';
	}
	if (!options.pathToPublic) {
		options.pathToPublic = __dirname + '/../../public';
	}
    if (!options.cachebuster) {
        options.cachebuster = config.get('githash');
    }

	// add appropriate middleware
	app.use(restify.bodyParser());
	app.use(morgan('dev'));

    /**
     * Allow for middleware to be passed through options:
     * skelenode.start({
     *     middleware: [
     *         restify.bodyParser(),
     *         morgan('dev')
     *     ]
     * });
     *
     * @param {array} options.middleware
     */
    if (options.middleware) {
        for (var i = options.middleware.length - 1; i >= 0; i--) {
            app.use(options.middleware[i]);
        };
    }

	// setup our socket XHR handler
	skelenodeSocket(app, config.get('db.redis.port'), config.get('db.redis.host'), config.get('db.redis.password'), config.get('dispatcher.debug'));

	// turn on an audit logger if we need to
	if (config.get('logger.audit.enabled')) {
		app.on('after', restify.auditLogger({
			log: bunyan.createLogger({
				name: packageJSON.name + '_audit',
				stream: process.stdout
			})
		}));
	}

	// serve our index file on root
	app.get('/', require(options.pathToViews + '/index'));

	// replace the githash in URLs so that the githash doesn't
	// have to be an actual directory
	app.use(function(req, res, next) {
		req.url = req.url.replace('/'+options.cachebuster+'/', '');
		next();
	});

	// server our static files via our githash so they are version
	// controlled
	var githashRegex = new RegExp('\/'+options.cachebuster+'\/.*');
	app.get(githashRegex, restify.serveStatic({
		directory: options.pathToPublic
	}));

	// configure swagger
	swagger.setAppHandler(app);
	swagger.configure('http://petstore.swagger.wordnik.com', '0.1');
	swagger.configureSwaggerPaths('', '/api-docs', '');

	// load all of our models
	skelenodeModelLoader.init(options.pathToModels, null, true);

	// startup our server
	app.listen(config.get('port'));
	console.log(chalk.cyan('[%s] Application started on port %s in %s environment.'),
		packageJSON.name.toUpperCase(),
		chalk.underline(config.get('port')),
		chalk.underline(config.util.getEnv('NODE_ENV')));
}