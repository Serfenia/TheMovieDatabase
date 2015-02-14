var args = arguments[0] || {};
var currentTab = undefined;

function closeWindow() {
	$.win.close();
	$.destroy();
}

function clickTab(e) {
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
	var m = Alloy.createModel('movie');
	m.fetch({id: args.id});
	m.toJSON()[0] && $.win.setTitle(m.toJSON()[0].original_title);
}

function shareItem() {
	
};

function openWindow(e) {
	Alloy.createController('people/credit', e).getView().open();
};

clickTab();
