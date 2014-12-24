'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone');
BB.$ = $;
window.jQuery = $;
var M = require('../lib/marionette/lib/backbone.marionette'),
	B = require('../lib/bootstrap/dist/js/bootstrap');

console.log('app started!7');