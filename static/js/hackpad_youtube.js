
function youtube_search(query) {   
    var embedlyKey = "426ffa42c62711e0b9a74040d3dc5c07";
    var url = "http://localhost:8080/api/embedly_youtube/" + query;

    $.getJSON(url, function(data) {
	    try {
		$('#youtube_results').append("<li class='thumbnail'><a href='"+data['url']+"'><img width=90 src='" + data['thumb']  + "' /></a></li>");
	    } catch (err) {
		//
	    }
    });           
} 