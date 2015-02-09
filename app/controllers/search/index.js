var args = arguments[0] || {};

if(OS_ANDROID) {
	require("com.alcoapps.actionbarextras").setSearchView({
		searchView: $.searchView,
		backgroundColor: CFG["COLORS"]["MAIN_COLOR"],
		textColor: 'white',
		hintColor: 'white'
	});
}

function search() {
	if(this.value && this.value.length > 0) {
		findMovie(this.value);
	}
}

function saveModel(obj) {
	var model = Alloy.createModel('movie');
	obj.poster_path = obj.poster_path ? CFG["URLS"]["IMAGES"]["POSTER"] + obj.poster_path : "";
	model.save(obj);
	return model;
}

function parseResponse(responseText) {
	var response = JSON.parse(responseText);		
	if(_.isArray(response.results)) 	
		_.each(response.results, function(movie) {
			$.movies.add(saveModel(movie), {silent:true});
		});
}

function findMovie(query) {
	$.movies.reset();
	if(G.hasInternet()) {
		var url = CFG["URLS"]["MOVIES"]["SEARCH"]+"?query="+escape(query)+"&api_key="+CFG["TMDB"]["API_KEY"];
		var xhr = Ti.Network.createHTTPClient({
			timeout: 10000,
			onerror: function onerror(e) {
				G.info(e);
			},
			onload: function onload(e) {
				try {
					parseResponse(this.responseText);
					$.movies.trigger('change');
				} catch(e) {
					G.info(JSON.stringify(e));	
				}
			}
		});
		
		G.info(url);
		G.info(JSON.stringify(CFG));
		xhr.open("GET", url);
		xhr.send();
	} else {
		G.info("No internet connection");
	}
}

function showMovie(e) {
	$.tab.open(Alloy.createController("show", {
		id: $.movies.models[e.itemIndex].attributes.id
	}).getView());
}

OS_IOS && $.win.open();