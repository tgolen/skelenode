'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob'),
	path = require('path'),
	libFiles = {},
	appFiles = [];

var bowerJsonFiles = glob.sync('public/lib/*/.bower.json');

_(bowerJsonFiles).forEach(function(bowerJsonFile) {
	var bowerJson = require(path.join('..', bowerJsonFile)),
		bowerDir = bowerJsonFile.replace('.bower.json', ''),
		mainJsFiles = [],
		mainCssFiles = [];
	// only get our js and css files from the bower "main" attribute
	if (bowerJson && bowerJson.main) {
		if (typeof bowerJson.main === 'string') {
			var mainFile = bowerJson.main;
			switch (_(mainFile.split('.')).last().toLowerCase()) {
				case 'js': mainJsFiles.push(bowerDir + mainFile); break;
				case 'css': mainCssFiles.push(bowerDir + mainFile); break;
			}
		} else {
			_(bowerJson.main).forEach(function(mainFile) {
				switch (_(mainFile.split('.')).last().toLowerCase()) {
					case 'js': mainJsFiles.push(bowerDir + mainFile); break;
					case 'css': mainCssFiles.push(bowerDir + mainFile); break;
				}
			});
		}
	}
	libFiles.js = _.union(libFiles.js || [], mainJsFiles);
	libFiles.css = _.union(libFiles.css || [], mainCssFiles);
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
	return {
		js: this.getGlobbedFiles(libFiles.js),
		css: this.getGlobbedFiles(libFiles.css)
	};
};