var args = arguments[0] || {};

/**
 * Gets the person according to the given ID with a GET request.
 * @param id {Number} : The ID of the person
 */
function getPerson(id) {
	var url = CFG["URLS"]["PEOPLE"]["ID"].replace("{id}", id) + G.URL_PARAMETERS.API_KEY;
	var xhr = Ti.Network.createHTTPClient({
		timeout: 10000,
		onerror: function onerror(e) {
			G.info(e);
		},
		onload: function onload(e) {
			try {
				parsePerson(xhr.responseText);
			} catch(e) {
				G.info(e);	
			}
		}
	});
	
	G.info(url);
	xhr.open("GET", url);
	xhr.send();
}

/**
 * Parses the response text by setting and saving the person model
 * @param responseText {String} : The person in a stringified JSON format. 
 */
function parsePerson(responseText) {
	var response = JSON.parse(responseText);
	$.personModel.set(response);
	$.personModel.save();
}

args.id && getPerson(args.id);
