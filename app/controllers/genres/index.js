var args = arguments[0] || {};

/**
 * Shows the selected movie in a show view.
 * @param {Object} e : The event object containing information about which item is clicked.
 */
function showMovie(e) {
	if(OS_IOS) {
		var ctrl = Alloy.createController("show", {
			id: $.movies.models[e.itemIndex].attributes.id
		});
		ctrl.on('openWindow', openWindow);
		$.tab.open(ctrl.getView());
	} else if(OS_ANDROID) {
		$.tab.open(Alloy.createController("show", {
			id: $.movies.models[e.itemIndex].attributes.id
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
