function onOpen() {
	var ABX = require("com.alcoapps.actionbarextras");
	ABX.setBackgroundColor(CFG["COLORS"]["ACTION_BAR_COLOR"]);
	ABX.setTitle('The Movie Database');
	ABX.setColor('white');
}

var content = Alloy.createController("view");
content.on("showMovie", function showSubWindow(e) {
	Alloy.createController(e.url, e.data).getView().open();
});
$.application.add(content.getView());
$.application.open();

content = null;
