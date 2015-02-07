/**
 * Alloy Globals pointer.
 * @type {Object}
 */
var G = Alloy.Globals;

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
 * Alloy CFG object.
 * Contains the data from the config.json
 * 
 * @type {Object}
 */
var CFG = Alloy.CFG;

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
 * @type {Object}
 */
var S = require("alloy/string");