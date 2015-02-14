var args = arguments[0] || {};

$.cast_members.getCastByMovieId(args.id);

/**
 * Gets the credits of the movie with a GET request.
 * @param id {Number} : The TMDB ID of the movie.
 */
function getCredits(id) {
	var url = CFG["URLS"]["MOVIES"]["CREDITS"].replace("{id}", id) + G.URL_PARAMETERS.API_KEY;
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = xhr.responseText;
				parseResponse(response);
				$.cast_members.trigger('change');
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.send();
}

/**
 * Parses the response text by saving the model and adding it to the cast member collection
 * @param responseText {String} : The credits in a stringified JSON format. 
 */
function parseResponse(responseText) {
	var response = JSON.parse(responseText);
	if(response.cast.length > 0) {
		_.each(response.cast, function(cast_member) {
			cast_member.position = cast_member.order;
			$.cast_members.add(saveModel(cast_member), {silent:true});
		});
	} 
}

/**
 * Saves the model to the local database.
 * Edits the poster path with a prefix of the image URL as specified in the config.
 * @param obj {Object} : A movie retrieved from TMDB as JSON
 */
function saveModel(obj) {
	var model = Alloy.createModel('cast_member');
	obj.movieId = args.id;
	model.save(obj);
	return model;
}

/**
 * Transforms the model before it is displayed.
 * 
 * @param model {Alloy Model} : The model
 */
function transformModel(model) {
	var m = model.toJSON();
	return m;
}

/**
 * Shows the actor in the cast in a detailed view.
 * @param {Object} e
 */
function showActor(e) {
	var model = $.cast_members.models[e.itemIndex];
	$.trigger('openWindow', {id: model.get('credit_id')});
}

if(G.hasInternet()) {
	getCredits(args.id);
}