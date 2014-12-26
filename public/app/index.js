'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone');

// assign our globals
BB.$ = $;
window.jQuery = $;

var API = require('../lib/skelenode-xhr-socket');
var example = require('./example');

console.log('app started!');
example.run();