'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone');

// assign our globals
BB.$ = $;
window.jQuery = $;

var API = require('../lib/skelenode-ajax-socket');
API.connectSocket();

/*var M = require('../lib/marionette/lib/backbone.marionette'),
	B = require('../lib/bootstrap/dist/js/bootstrap');*/

console.log('app started!11');