var args = arguments[0] || {};
var model = Alloy.createModel("movie");
model.fetch({id:args.id});

var trailers = $.movie.get("trailers");

$.movie.set(model.toJSON()[0]);
trailers && toggleTrailerButton(JSON.parse(trailers));
model = null;

function getMovie(id) {
	var url = CFG["URLS"]["MOVIES"]["ID"].replace("{id}", id) + G.URL_PARAMETERS.API_KEY + G.URL_PARAMETERS.I18N;
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
				
				getTrailerInfo(id);
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.send();
}

function getTrailerInfo(id) {
	var url = CFG["URLS"]["MOVIES"]["TRAILERS"].replace("{id}", id) + G.URL_PARAMETERS.API_KEY;
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = JSON.parse(this.responseText);
				toggleTrailerButton(response.results);
				$.movie.set({"trailers": JSON.stringify(response.results)});
				$.movie.save();
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	G.info(url);
	xhr.open("GET", url);
	xhr.send();
}

function watchTrailer() {
	var trailers = JSON.parse($.movie.get("trailers"));
	if(!_.isEmpty(trailers)) {
		var trailer = _.first(trailers);
		switch(trailer.site.toLowerCase()) {
			case "youtube": openYoutubeVideo(trailer.key); break;
			default: ;
		}
	}
}

function openYoutubeVideo(key) {

}

function toggleTrailerButton(array) {
	_.isArray(array) && !_.isEmpty(array) && $.trailerBtn.show();
}

if(G.hasInternet()) {
	getMovie(args.id);
}
