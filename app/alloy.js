/**
 * Alloy CFG object.
 * Contains the data from the config.json
 * 
 * @type {Object}
 */
var CFG = Alloy.CFG;

/**
 * Alloy Globals pointer.
 * @type {Object}
 */
var G = Alloy.Globals;

G.COLORS = CFG["COLORS"];

G.URL_PARAMETERS = {
	API_KEY: "?api_key="+CFG["TMDB"]["API_KEY"],
	I18N: "&language=en"
};

/**
 * Checks whether the device has an internet connection.
 * @returns {Boolean} True if there is an internet connection, false if not.
 */
G.hasInternet = function() {
	return Ti.Network.getNetworkType() !== Ti.Network.NETWORK_NONE;
};
/**
 * Short function for logging
 * @param mes {String} The message to log
 */
G.info = function(mes) {
	Ti.API.info(mes);
};


/**
 * The properties object.
 * @type {Object}
 */
var P = Ti.App.Properties;

/**
 * The underscorejs library.
 * 
 * @see http://www.underscorejs.org/
 * @type {Object}
 */
var _ = require("alloy/underscore");

/**
 * The string library for easy and quick string manipulation functions.
 * @see http://docs.appcelerator.com/titanium/3.0/#!/api/Alloy.builtins.string
 * @type {Object}
 */
var S = require("alloy/string");

/**
 * The dialogs object to create quick confirm dialogs
 * @see http://docs.appcelerator.com/titanium/3.0/#!/api/Alloy.builtins.dialogs
 * @type {Object}
 */
var D = require("alloy/dialogs");
