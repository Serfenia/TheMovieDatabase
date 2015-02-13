/**
 * Retrieves the mp4 urls of the youtube video.
 * @see Retrieved from: https://developer.appcelerator.com/question/70481/playing-youtube-using-titaniummediavideoplayer
 */
function getYoutubeVideos(key, successCallback, errorCallback) {
    var client = Ti.Network.createHTTPClient();
    client.onload = function () {
        var json = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
        var response = JSON.parse(json);
        var video = response.content.video;
        successCallback(response);
    };
    client.setRequestHeader('Referer', 'http://www.youtube.com/watch?v=' + key);
    client.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14');
    client.open('GET', 'http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=' + key);
    client.send();
}

exports = getYoutubeVideos;
