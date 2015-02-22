var args = arguments[0] || {};
var currentTab = undefined;

function closeWindow() {
	$.win.close();
	$.destroy();
}

function clickTab() {
	var tab = $.win.activeTab || $.win.tabs[0];
	if(tab.window.children.length === 0) {
		var ctrl = Alloy.createController("show/"+tab.title.toLowerCase(), {
			id: args.id
		});
		ctrl.on('openWindow', openWindow);
		tab.window.add(ctrl.getView());
		setActionBarTitle();
	}
}

function setActionBarTitle() {
	$.win.setTitle(args.original_title);
}

function shareItem() {
	
};

function openWindow(e) {
	Alloy.createController('people/person', e).getView().open();
};

clickTab();
