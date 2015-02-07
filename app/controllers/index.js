$.application.open();

function onOpen() {
	var ABX = require("com.alcoapps.actionbarextras");
	ABX.setBackgroundColor(CFG["COLORS"]["ACTION_BAR_COLOR"]);
	ABX.setTitle('The Movie Database');
	ABX.setColor('white');
}
