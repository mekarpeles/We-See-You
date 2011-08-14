
function google_search(query) {
    var url = 'http://www.baybo.net:1999/hackpad/req?q=' + query;
//    url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBnAuDlO0YvGOeqmbIxAbf9k9SezAOEX4Q&cx=013036536707430787589:_pqjad5hr1a&q=" + i['q'] + "&alt=json";
    $.get(url, function(data) {
	    var entry = jQuery.parseJSON(data).items[0];
	    var res = "<div><a href='" + entry['link'] + "'>";
	    res += entry['title'] + "</a></div>";
	    
	    if (data['snippet']) {
		res += "<div>" + entry['snippet'] + "</div>";
	    }
	    $('#results').append(res);
	});
}
