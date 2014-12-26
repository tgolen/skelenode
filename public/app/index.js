'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone');

// assign our globals
BB.$ = $;
window.jQuery = $;

var API = require('../lib/skelenode-xhr-socket');
API.connectSocket();

/*var M = require('../lib/marionette/lib/backbone.marionette'),
	B = require('../lib/bootstrap/dist/js/bootstrap');*/

console.log('app started!12');

// make an xhr request
$('.btn-primary').on('click', function() {
	console.log('primary click');
	API.get('hello/world', null, { disallowSocket: true }, function(data) {
		console.log(data);
	});
});

// make a socket request
$('.btn-info').on('click', function() {
	console.log('info click');
	API.get('/hello/world', function(data) {
		console.log(data);
	});
});