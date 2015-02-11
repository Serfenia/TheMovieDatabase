var args = arguments[0] || {};

$.reviews.getReviewsByMovieId(args.id);

function getReviews(id) {
	var url = CFG["URLS"]["MOVIES"]["REVIEWS"].replace("{id}", id) + G.URL_PARAMETERS.API_KEY;
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = xhr.responseText;
				parseResponse(response);
				$.reviews.trigger('change');
				$.list.show();
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	G.info(url);
	xhr.open("GET", url);
	xhr.send();
}

/**
 * Parses the response text by saving the model and adding it to the review collection
 * @param responseText {String} : The reviews in a stringified JSON format. 
 */
function parseResponse(responseText) {
	var response = JSON.parse(responseText);	
	if(response.results.length > 0) {
		setSections([1,2]);
		_.each(response.results, function(review) {
			$.reviews.add(saveModel(review), {silent:true});
		});
	} else  {
		setSections([0]);
	}
}

/**
 * Saves the model to the local database.
 * Edits the poster path with a prefix of the image URL as specified in the config.
 * @param obj {Object} : A movie retrieved from TMDB as JSON
 */
function saveModel(obj) {
	var model = Alloy.createModel('review');
	obj.movieId = args.id;
	model.save(obj);
	return model;
}

/**
 * Transforms the model before it is displayed
 * @param model {Alloy Model} : The model
 */
function transformModel(model) {
	var m = model.toJSON();
	m.author = "Author: " + m.author;
	return m;
}

/**
 * Opens the original post of the review by it's url
 */
function openUrl(e) {
	G.info(this.url);
	Ti.Platform.openURL(this.url);
}

/**
 * Sets the sections
 * @param {Object} array
 */
function setSections(array) {
	var currentSections = $.list.getSections();
	var newSections = [];
	_.each(array, function(index) {
		newSections.push(currentSections[index]);
	});
	$.list.setSections(newSections);
}

if(G.hasInternet()) {
	getReviews(args.id);
}