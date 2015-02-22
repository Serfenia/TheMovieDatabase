var args = arguments[0] || {};

$.movie_genres.fetch();

/**
 * Saves the model to the local database.
 * Edits the poster path with a prefix of the image URL as specified in the config.
 * @param obj {Object} : A movie retrieved from TMDB as JSON
 */
function saveModel(obj) {
	var model = Alloy.createModel('genre');
	model.save(obj);
	return model;
}

/**
 * Parses the response text by saving the model and adding it to the movie genres collection
 * @param responseText {String} : The genres in a stringified JSON format. 
 */
function parseResponse(responseText) {
	var response = JSON.parse(responseText);			
	_.each(response.genres, function(genre) {
		$.movie_genres.add(saveModel(genre), {silent:true});
	});
}

/**
 * Retrieves the upcoming movies from TMDB with an HTTPClient if the device has an internet connection.
 * @see http://docs.themoviedb.apiary.io/#reference/movies/movieupcoming
 */
function getMovieGenres() {
	if(G.hasInternet()) {
		var url = CFG["URLS"]["GENRES"]["MOVIES"] + G.URL_PARAMETERS.API_KEY;
		var xhr = Ti.Network.createHTTPClient({
			timeout: 10000,
			onerror: function onerror(e) {
				G.info(e);
			},
			onload: function onload(e) {
				try {
					parseResponse(this.responseText);
					$.movie_genres.trigger('change');
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
function showGenre(e) {
	var genreAttributes = $.movie_genres.models[e.itemIndex].attributes;
	if(OS_IOS) {
		var ctrl = Alloy.createController("genres/show", {
			id: genreAttributes.id,
			name: genreAttributes.name
		});
		ctrl.on('openWindow', openWindow);
		$.tab.open(ctrl.getView());
	} else if(OS_ANDROID) {
		$.tab.open(Alloy.createController("genres/show", {
			id: genreAttributes.id,
			name: genreAttributes.name
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

if(_.isEmpty($.movie_genres.models))
	getMovieGenres();