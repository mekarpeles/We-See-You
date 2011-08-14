function doCI(queryString, service, type) {
    /**
     * Does Named Entity Recognition (NER) on the provided query string 
     * via Complexity Intelligence's NLP API 
     */

    // Config Vars
    var bump_url = 'http://localhost:8080/req?q=';
    var CI_PUBLICACCESSID = '4f8a395ffd607d13cddff9455de91cadd508e894879ee3c66f440abc37f6f09c';
    var CI_SECRET = 'fa50785c2313d388b15268561ac798797dbff040fd616e589cd8423d4894a122';
    var CI_ENDPOINT = 'http://us.ws.complexityintelligence.com/rest/nlp/ner/v1';
    // default variables, service = 'nlp' and type = 'ner'
    { service = typeof(service) != 'undefined' ? service : 'nlp';
      type = typeof(type) != 'undefined' ? type: 'ner';
    }
            
    var hmac_sha256_hex = HMAC_SHA256_MAC(CI_SECRET, service + type + queryString); // HMAC-SHA256 hash of service + type + text
    var query = { "rService": service,
                  "rType": type,
                  "pText": queryString,
                  "authWSControlKey": hmac_sha256_hex,
                  "publicAccessID": CI_PUBLICACCESSID
    }
    var endpoint_url = bump_url + escape(CI_ENDPOINT + "?" + $.param(query));
    $.ajax({
            type: 'POST',
            url: endpoint_url,
            success: function(data) {
                $(data).find("results").children().each(function(){			
                    $("#list_" + this.nodeName).append("<li>" + recognize($(this).text()) + "</li>");
                });
            },
            dataType: 'xml',
	});
}

function recognize(entityName) {
    var url = 'http://en.wikipedia.org/wiki/' + entityName;
    var result = '<a href="' 
        + url + '" title="' 
        + entityName 
        + ' on Wikipedia">' 
        + entityName 
        + '</a>';

    return result;
}

