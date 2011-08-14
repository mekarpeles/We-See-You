
function bing_search(query, source) {
    source = typeof(source) != 'undefined' ? service : 'web';
    var url = "http://localhost:8080/req?q=" +
        escape("http://api.search.live.net/json.aspx?" +
	       "Appid=38AF132A8C9243F6662C561D0890DDB2A5CA309C&query=" +
	       query + "&sources=" + source);

    $.get(url, function(data) {
	    if (jQuery.parseJSON(data)) {

		var entry = jQuery.parseJSON(data)['SearchResponse']['Web']['Results'][0];
		var res = "<li><a href='http://" + entry['DisplayUrl'] + "'>";
		res += entry['Title'] + "</a></li>";
            
		if (data['Description']) {
		    res += "<li>" + jQuery.parseJSON(data) + "</li>";
		    //res += "<li>" + entry['Description'] + "</li>";
		}
		$('#results').append(res);
	    }
	});
}
