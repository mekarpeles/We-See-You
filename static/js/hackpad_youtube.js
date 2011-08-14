
function youtube_search(query) {   
    var embedlyKey = "426ffa42c62711e0b9a74040d3dc5c07";
     
    var youtubeSearchUrl = "https://gdata.youtube.com/feeds/api/videos?alt=json&q="
        + query.replace(" ", "+") + "&orderby=relevance&max-results=10&v2";
    var embedlyUrl = "http://api.embed.ly/1/oembed?key=" + embedlyKey 
        + "&maxwidth=400&"
        + "&urls="; 
    $.get(youtubeSearchUrl, function(data) {
        
        var youtubeJson = $.parseJSON(data);
        
        
        $.each(youtubeJson.feed.entry, function(key, val) {
            if (val != null) {
                var videoUrl = val["media\$group"]["media\$content"][0].url;
                embedlyUrl = embedlyUrl + escape(videoUrl) + ",";
            }
        });
        
        console.log(embedlyUrl);
      /*  
        $.get(embedlyUrl, function(data) {
            var embedlyJson = $.parseJSON(data);
            
            $.each(embedlyJson, function(key, val) {
                console.log(val.thumbnail_url);
            });
            
        });
    */    
  });
    
        
} 