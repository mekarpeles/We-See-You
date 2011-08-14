
function youtube_search(query) {   
    var embedlyKey = "426ffa42c62711e0b9a74040d3dc5c07";
     
    var url = "http://localhost:8080/api/youtube/" + query;

    var embedlyUrl = "http://api.embed.ly/1/oembed?key=" + embedlyKey 
        + "&maxwidth=400"
        + "&urls="; 
    $.getJSON(url, function(data) {       
        $.each(data.feed.entry, function(key, val) {
            if (val != null) {
                var videoUrl = val["mediagroup"]["mediacontent"].url;
                embedlyUrl = embedlyUrl + escape(videoUrl) + ",";
            }
        });
        

        $.getJSON(embedlyUrl, function(data) {
            
            $.each(data, function(key, val) {
		    console.log(val.thumbnail_url);
            });
            
        });

  });
    
        
} 