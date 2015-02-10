var args = arguments[0] || {};

/**
 * Saves the model to the local database.
 * Edits the poster path with a prefix of the image URL as specified in the config.
 * @param obj {Object} : A movie retrieved from TMDB as JSON
 */
function saveModel(obj) {
	var model = Alloy.createModel('movie');
	obj.poster_path = obj.poster_path ? CFG["URLS"]["IMAGES"]["POSTER"] + obj.poster_path : "";
	model.save(obj);
	return model;
}

/**
 * Parses the response text by saving the model and adding it to the movie collection
 * @param responseText {String} : The upcoming movies in a stringified JSON format. 
 */
function parseResponse(responseText) {
	var response = JSON.parse(responseText);			
	_.each(response.results, function(movie) {
		$.movies.add(saveModel(movie), {silent:true});
	});
}

/**
 * Retrieves the upcoming movies from TMDB with an HTTPClient if the device has an internet connection.
 * @see http://docs.themoviedb.apiary.io/#reference/movies/movieupcoming
 */
function getUpcomingMovies() {
	if(G.hasInternet()) {
		var url = CFG["URLS"]["MOVIES"]["UPCOMING"]+"?api_key="+CFG["TMDB"]["API_KEY"];
		var xhr = Ti.Network.createHTTPClient({
			timeout: 10000,
			onerror: function onerror(e) {
				G.info(e);
			},
			onload: function onload(e) {
				try {
					parseResponse(this.responseText);
					$.movies.trigger('change');
					$.ptr.hide();
				} catch(e) {
					G.info(e);	
				}
			}
		});
		
		xhr.open("GET", url);
		xhr.send();
	} else {
		info("No internet connection");
	}
}


/**
 * Shows the selected movie in a show view.
 * @param {Object} e : The event object containing information about which item is clicked.
 */
function showMovie(e) {
	$.tab.open(Alloy.createController("show", {
		id: $.movies.models[e.itemIndex].attributes.id
	}).getView());
};

/**
 * Create the index controller of the search page.
 * Fired when clicked on the rightNavButton in this view.
 */
function openSearch() {
	Alloy.createController("search/index");
}

getUpcomingMovies();