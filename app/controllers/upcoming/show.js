var args = arguments[0] || {};
var model = Alloy.createModel("movie");
model.fetch({id:args.id});

$.movie.set(model.toJSON()[0]);


if(G.hasInternet()) {
	var url = "http://api.themoviedb.org/3/movie/"+args.id+"?api_key="+CFG["TMDB"]["API_KEY"]+"&language=en";
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = JSON.parse(xhr.responseText);
				response.poster_path = response.poster_path ? CFG["URLS"]["IMAGES"]["POSTER"] + response.poster_path : "";
				$.movie.set(response);
				$.movie.save();
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.send();
}