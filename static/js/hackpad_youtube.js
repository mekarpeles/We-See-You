
function youtube_search(query) {   
    var embedlyKey = "426ffa42c62711e0b9a74040d3dc5c07";
    var url = "http://localhost:8080/api/embedly_youtube/" + query;

    $.getJSON(url, function(data) {
        $.each(data.feed.entry, function(key, val) {
            if (val != null) {
		try {
		    $('#youtube_results').append("<li><a href='" + val + "'>" + vidurl + "</a></li>");
		} catch (err) {
		    //
		}
            }	    
        });
    });           
} 