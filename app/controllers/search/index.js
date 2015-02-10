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
	var value = $.searchView.getValue();
	if(value && value.length > 0) {
		findMovie(value);
		$.searchView.blur();
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
	if(_.isArray(response.results)) {
		_.each(response.results, function(movie) {
			$.movies.add(saveModel(movie), {silent:true});
		});
	}
}

function findMovie(query) {
	$.movies.reset();
	if(G.hasInternet()) {
		var url = CFG["URLS"]["SEARCH"]["MOVIE"]+ G.URL_PARAMETERS.API_KEY + "&query="+escape(query);
		var xhr = Ti.Network.createHTTPClient({
			timeout: 10000,
			onerror: function(e) {
				G.info(e);
			},
			onload: function(e) {
				try {
					parseResponse(this.responseText);
					$.movies.trigger('change');
					$.ptr.hide();
				} catch(e) {
					G.info(JSON.stringify(e));	
				}
			}
		});
		
		xhr.open("GET", url);
		xhr.send();
	} else {
		G.info("No internet connection");
	}
}

var showMovie = function(e) {};
if(OS_IOS) {
	var showMovie = function(e) {
		$.win.openWindow(Alloy.createController("show", {
			id: $.movies.models[e.itemIndex].attributes.id
		}).getView());
	};
} else if(OS_ANDROID) {
	var showMovie = function(e) {
		Alloy.createController("show", {
			id: $.movies.models[e.itemIndex].attributes.id
		}).getView().open();
	};
}

function closeWindow() {
	$.win.close({
		transition: (OS_IOS ? Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT : undefined)
	});
}

$.win.open({
	transition: (OS_IOS ? Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT : undefined)
});
