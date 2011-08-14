
function youtube_search(query) {    
    var url = "https://gdata.youtube.com/feeds/api/videos?alt=json&q="
        + query + "orderby=relevance&max-results=10&v2";
    $.getJSON(url, function(data) {
        $.each(data.feed.link, function(key, val) {
           alert(val.href) ;
        });
    });
} 