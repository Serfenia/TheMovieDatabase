var args = arguments[0] || {};
var movieCollection = Alloy.Collections.instance('movie');

function saveModel(obj) {
	var model = Alloy.createModel('movie');
	obj.poster_path = obj.poster_path ? CFG["URLS"]["IMAGES"]["POSTER"] + obj.poster_path : "";
	model.save(obj);
	return model;
}

function parseResponse(responseText) {
	var response = JSON.parse(responseText);			
	_.each(response.results, function(movie) {
		movieCollection.add(saveModel(movie), {silent:true});
	});
}

function getUpcomingMovies() {
	if(G.hasInternet()) {
		var url = "http://api.themoviedb.org/3/movie/upcoming?api_key="+CFG["TMDB"]["API_KEY"];
		var xhr = Ti.Network.createHTTPClient({
			timeout: 10000,
			onerror: function onerror(e) {
				G.info(e);
			},
			onload: function onload(e) {
				try {
					parseResponse(this.responseText);
					movieCollection.trigger('change');
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
	$.trigger("show", {
		url: "upcoming/show",
		data: {
			id: movieCollection.models[e.itemIndex].attributes.id
		}
	});
};

getUpcomingMovies();
