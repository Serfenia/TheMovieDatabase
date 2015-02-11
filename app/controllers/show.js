var args = arguments[0] || {};
var model = Alloy.createModel("movie");
model.fetch({id:args.id});

$.movie.set(model.toJSON()[0]);

if(G.hasInternet()) {
	var url = CFG["URLS"]["MOVIES"]["ID"] + args.id + G.URL_PARAMETERS.API_KEY + G.URL_PARAMETERS.I18N;
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
				
				getTrailerInfo();
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.send();
}

function getTrailerInfo() {
	var url = CFG["URLS"]["MOVIES"]["TRAILERS"].replace("{id}", args.id) + G.URL_PARAMETERS.API_KEY;
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				var response = JSON.parse(this.responseText);
				!_.isEmpty(response.results) && $.trailerBtn.show();
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

function shareItem() {
	
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
	if(OS_IOS) {
	
	} if(OS_ANDROID) {
		Ti.Platform.openURL('http://www.youtube.com/watch?v=' + key);
	}
}

function closeWindow() {
	$.win.close();
}
