
function baybo_search(query) {
    var url = 'http://www.baybo.net:1999/api/users/' + query
    $.get(url, function(data) {
	    console.log(jQuery.parseJSON(data));
	    //var entry = jQuery.parseJSON(data);
	    /*
	    var res = "<div><a href='/shop/p/" + entry['id'] + "'>";
	    res += entry['title'] + "</a></div>";
	    
	    if (data['snippet']) {
		res += "<div>" + entry['snippet'] + "</div>";
	    }
	    $('#results').html(res);	    
	    */
	});
}
