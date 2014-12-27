'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone');

// assign our globals or else other libraries will complain
BB.$ = $;
window.jQuery = $;

var example = require('./example');

console.log('app started!');
example.run();