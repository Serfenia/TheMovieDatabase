var args = arguments[0] || {};

if(OS_ANDROID) {
	require("com.alcoapps.actionbarextras").setSearchView({
		searchView: $.searchView,
		backgroundColor: CFG["COLORS"]["MAIN_COLOR"],
		textColor: 'white',
		hintColor: 'white'
	});
}

$.win.open();