'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob'),
	bowerJson = require('../bower.json'),
	bowerLibs = [],
	libFiles = [],
	appFiles = [];

// get all the JS and CSS files from our installed libraries
_(bowerJson.dependencies).forEach(function(dependency, name) {
	var bowerLib = require('../public/lib/'+name+'/.bower'),
		mainFiles = [];

	// only get our js and css files from the bower "main" attribute
	if (bowerLib && bowerLib.main) {
		_(bowerLib.main).forEach(function(mainFile) {
			if ([ 'js', 'css' ].indexOf(_(mainFile.split('.')).last()) > -1) {
				mainFiles.push('public/lib/'+name+'/' + mainFile);
			}
		});
	}
	libFiles = _.union(libFiles, mainFiles);
});

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob.sync(globPatterns);
			if (removeRoot) {
				files = files.map(function(file) {
					return file.replace(removeRoot, '');
				});
			}

			output = _.union(output, files);
		}
	}
	return output;
};

/**
 * Get all of our JS and CSS assets
 */
module.exports.getAssets = function() {
	var output = this.getGlobbedFiles(libFiles);
	return output;
};