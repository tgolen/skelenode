'use strict';

// we have to do this to get marionette working properly
var $ = require('jquery'),
	BB = require('backbone'),
	API = require('../lib/skelenode-xhr-socket');

exports.run = function() {
	API.connectSocket(function() {
		console.log('socket connected!');

		var testModel = BB.Model.extend({
			url: '/api/v1/hello/world'
		});
		var myModel = new testModel();
		myModel.fetch({
			success: function() {
				console.log('model fetched!', myModel);
			}
		});
	});

	/*var M = require('../lib/marionette/lib/backbone.marionette'),
		B = require('../lib/bootstrap/dist/js/bootstrap');*/

	// make an xhr request
	$('[data-action="xhr-request"]').on('click', function() {
		console.log('primary click');
		API.get('/api/v1/hello/world', null, { disallowSocket: true }, function(data) {
			console.log(data);
		});
	});

	// make a bad xhr request
	$('[data-action="bad-xhr-request"]').on('click', function() {
		console.log('primary click');
		API.get('/api/v1/hello/world2', null, { disallowSocket: true }, function(data) {
			console.log(data);
		});
	});

	// make a socket request
	$('[data-action="socket-request"]').on('click', function() {
		console.log('info click');
		API.get('/api/v1/hello/world', function(data) {
			console.log(data);
		});
	});

	// make a bad socket request
	$('[data-action="bad-socket-request"]').on('click', function() {
		console.log('bad click');
		API.get('/api/v1/hello/world2', function(data) {
			console.log(data);
		});
	});

	console.log('subscribe');
	API.subscribe('example', 'hello-world-event', function() {
		console.log('recieved hello-world-event!');
	});
}