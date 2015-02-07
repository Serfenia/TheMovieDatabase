var content = Alloy.createController("view");
content.on("showMovie", function showSubWindow(e) {
	$.application.openWindow(Alloy.createController(e.url, e.data).getView());
});
$.window.add(content.getView());

$.application.open();