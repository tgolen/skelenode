'use strict';

var _ = require('lodash');

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.html'],
		serverJS: ['gruntfile.js', 'index.js', 'config/**/*.js', 'app/**/*.js'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			app: {
				src: ['public/app/**/*.js'],
				dest: 'public/dist/application.js',
				options: {
					alias: [
						'./public/lib/jquery/dist/jquery.js:jquery',
						'./public/lib/backbone/backbone.js:backbone',
						'./public/lib/underscore/underscore.js:underscore'
					],
					external: [ 'jQuery' ]
				}
			}
		},
		watch: {
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
			},
			clientJS: {
				files: ['public/app/**/*.js'],
				tasks: ['jshint', 'browserify', 'uglify', 'clean']
			},
			app: {
				files: './public/dist/application.min.js',
				options: {
					livereload: true,
				}
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		concat: {
			css: {
				src: '<%= vendorCSSFiles %>',
				dest: 'public/dist/vendor.css'
			}
		},
		clean: {
			js: ['public/dist/*.js', '!public/dist/*.min.js'],
			css: ['public/dist/*.css', '!public/dist/*.min.css']
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		/*cssmin: {
			combine: {
				files: {
					'public/dist/vendor.min.css': '<%= vendorCSSFiles %>'
				}
			}
		},*/
		nodemon: {
			dev: {
				script: 'index.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'browserify', 'watch'],
			debug: ['nodemon', 'browserify', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var assets = require('./config/assets').getAssets();

		grunt.config.set('vendorJavaScriptFiles', assets.js);
		grunt.config.set('vendorCSSFiles', assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'concat'/*, 'uglify', 'cssmin', 'clean'*/]);
};