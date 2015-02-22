var args = arguments[0] || {};
var currentTab = undefined;

function closeWindow() {
	$.win.close();
	$.destroy();
}

function clickTab(e) {
	if(e.index !== currentTab) {
		currentTab !== undefined && $.win.remove(_.last($.win.children));
		var ctrl = Alloy.createController("show/"+$.tabbedBar.labels[e.index].title.toLowerCase(), {
			id: args.id
		});
		ctrl.on('openWindow', openWindow);
		$.win.add(ctrl.getView());
		$.win.setTitle(args.original_title);
		currentTab = e.index;
	}
}

function shareItem() {
	
};

function openWindow(e) {
	$.trigger('openWindow', {url: 'people/person', data: e});
};

clickTab({
	index: 0
});
