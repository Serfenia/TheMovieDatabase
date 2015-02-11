var args = arguments[0] || {};
var currentTab = undefined;

function closeWindow() {
	$.win.close();
	$.destroy();
}

function clickTab(e) {
	var tab = $.win.activeTab || $.win.tabs[0];
	if(tab.window.children.length === 0) {
		tab.window.add(Alloy.createController("show/"+tab.title.toLowerCase(), {
			id: args.id
		}).getView());
		setActionBarTitle();
	}
}

function setActionBarTitle() {
	var m = Alloy.createModel('movie');
	m.fetch({id: args.id});
	$.win.setTitle(m.toJSON()[0].original_title);
}

function shareItem() {
	
};

clickTab();
