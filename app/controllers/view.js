var args = arguments[0] || {};
var movieCollection = Alloy.Collections.instance('movie');

if(G.hasInternet()) {
	var url = "http://api.themoviedb.org/3/movie/upcoming?api_key="+CFG["TMDB"]["API_KEY"];
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = JSON.parse(xhr.responseText);
				
				_.each(response.results, function(movie) {
					movie.poster_path = movie.poster_path ? CFG["URLS"]["IMAGES"]["POSTER"] + movie.poster_path : "";
					var model = Alloy.createModel('movie');
					model.save(movie);
					movieCollection.add(movie, {silent:true});
				});
				
				movieCollection.trigger('change');
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.send();
}

function showMovie(e) {
	$.trigger("showMovie", {
		url: "show",
		data: {
			id: movieCollection.models[e.itemIndex].attributes.id
		}
	});
};
