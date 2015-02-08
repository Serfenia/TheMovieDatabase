var args = arguments[0] || {};

var content = Alloy.createController("upcoming/list");
content.on("show", function showSubWindow(e) {
	$.tab.open(Alloy.createController(e.url, e.data).getView());
});
$.win.add(content.getView());