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
function getPopularMovies() {
	if(G.hasInternet()) {
		var url = CFG["URLS"]["MOVIES"]["POPULAR"] + G.URL_PARAMETERS.API_KEY;
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
	var movieAttributes = $.movies.models[e.itemIndex].attributes;
	if(OS_IOS) {
		var ctrl = Alloy.createController("show/movie", {
			id: movieAttributes.id,
			original_title: movieAttributes.original_title
		});
		ctrl.on('openWindow', openWindow);
		$.tab.open(ctrl.getView());
	} else if(OS_ANDROID) {
		$.tab.open(Alloy.createController("show/movie", {
			id: movieAttributes.id,
			original_title: movieAttributes.original_title
		}).getView());
	}
};
/**
 * Opens the window based on the given url and data
 */
function openWindow(e) {
	$.tab.open(Alloy.createController(e.url, e.data).getView());
}


/**
 * Create the index controller of the search page.
 * Fired when clicked on the rightNavButton in this view.
 */
function openSearch() {
	Alloy.createController("search/index");
}

getPopularMovies();