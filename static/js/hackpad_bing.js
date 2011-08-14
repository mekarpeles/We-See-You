
function bing_search(query, source) {
    source = typeof(source) != 'undefined' ? service : 'web';
    var url = "http://localhost:8080/api/bing/" + query;

    $.getJSON(url, function(data) {
	    if (data) {
		var entry = data['SearchResponse']['Web']['Results'][0];

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
