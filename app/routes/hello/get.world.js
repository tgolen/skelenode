module.exports = {
	spec: {
		method: 'GET',
		path: '/api/v1/hello/world',
		nickname: 'hello_world'
	},
	action: function(req, res, next) {
		res.send('Hello World!');
		next();
	}
};