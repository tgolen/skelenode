module.exports = {
	spec: {
		method: 'GET',
		path: '/api/v1/hello/world',
		nickname: 'hello_world'
	},
	action: function(req, res, next) {
		res.send('Hello World!');
	}

	/*'spec': {
	"description" : "Operations about pets",
	"path" : "/pet.{format}/{petId}",
	"notes" : "Returns a pet based on ID",
	"summary" : "Find pet by ID",
	"method": "GET",
	"parameters" : [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
	"type" : "Pet",
	"errorResponses" : [swagger.errors.invalid('id'), swagger.errors.notFound('pet')],
	"nickname" : "getPetById"
	},
	'action': function (req,res) {
	if (!req.params.petId) {
	throw swagger.errors.invalid('id'); }
	var id = parseInt(req.params.petId);
	var pet = petData.getPetById(id);

	if(pet) res.send(JSON.stringify(pet));
	else throw swagger.errors.notFound('pet');
	}*/
};