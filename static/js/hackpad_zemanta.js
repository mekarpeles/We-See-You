
function zemanta(text) {
    var key = "r8kdrptqrwbpgbtjr7pqappt";
    var url = 'http://api.zemanta.com/services/rest/0.0?method=json&api_key=' +
	key + "&text=" + text + ;

    $.get(url, function(data) {
	    $("#results").append("<li>" + jQuery.parseJSON(data) + "</li>");
	});

}

function prepareZemantaData(apikey, text) {
    return {
	method: 'zemanta.suggest',
	    format: 'wnjson',
	    api_key: apikey,
	    text: text
	    // for more options check http://developer.zemanta.com/docs/suggest/
	    };
}

function getZemantaAPI(data, callback) {
    $.ajax({    
	    url: 'http://api.zemanta.com/services/rest/0.0/',
		type: 'POST',
		data: data,
		success: function (data, type) {
		callback(JSON.parse(data));
	    }
	});
}


function zemantaCall(event, keyRx, text) {	
    var key = "r8kdrptqrwbpgbtjr7pqappt";
    if (key && key.length === 24 && key.match(keyRx) && text) {
	getZemantaAPI(
		      prepareZemantaData(key, text), 
		      function (data) {
			  $('#result').empty().text(JSON.stringify(data, null, 2));
		      });
    }
    event.preventDefault();
}
