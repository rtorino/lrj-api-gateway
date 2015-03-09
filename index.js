'use strict';

var Hapi = require('hapi');
var mongoose = require('mongoose');

var config = require('./config');
var routes = require('./routes');

var env = process.NODE_ENV || 'development';

// Connect to database
mongoose.connect('mongodb://localhost/lahirajud');

var server = new Hapi.Server();
server.connection({
	port: config[env].api.port,
	routes: {
		cors: true
	}
});

// Register all plugins
var plugins = [];
var pluginOptions = {};

server.register(plugins, pluginOptions, function (error) {
	if (error) {
		throw error;
	} else {

		// Add all the routes within the routes folder
		for (var route in routes) {
			server.route(routes[route]);
		}

		// Start the server
		server.start(function() {
			console.log('Server running at:', server.info.uri);
		});
	}
});
