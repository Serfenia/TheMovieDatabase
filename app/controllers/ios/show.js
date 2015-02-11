var args = arguments[0] || {};
var currentTab = undefined;

function closeWindow() {
	$.win.close();
	$.destroy();
}

function clickTab(e) {
	if(e.index !== currentTab) {
		currentTab !== undefined && $.win.remove(_.last($.win.children));
		$.win.add(Alloy.createController("show/"+$.tabbedBar.labels[e.index].title.toLowerCase(), {
			id: args.id
		}).getView());
		currentTab = e.index;
	}
}

function shareItem() {
	
};

clickTab({
	index: $.tabbedBar.index
});
