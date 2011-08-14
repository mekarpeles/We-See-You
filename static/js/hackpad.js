

/*
function doSearch(queryString) 
{
    var provider = 'http://www.google.com/search?q=';
    var query = urlQuote(queryString);
    var grsp = $.get(searchQuery, function(data) {
	    $('.result').html(data);
	    console.log('Searching for x in google');
	});  
}

function urlQuote(inputString) 
{
    return inputString;
}

function selection()
{
    var txt = '';
    if (window.getSelection) {
	txt = window.getSelection();
    } else if (document.getSelection) {
	txt = document.getSelection();
    } else if (document.selection) {
	txt = document.selection.createRange().text;
    } else {
	return;
    }
    return txt;
}	
*/

DELIM_CHAR_CODES = {
    33: "!",
    63: "?",
    46: ".",
    59: ";"
}
MISC_CHAR_CODES = {
    44: ",",
    42: "*",
    40: "(",
    41: ")",
    38: "&",
    35: "#",
    92: "\\",
    47: "/",
    124: "|",
    126: "~",
    96: "`",
    58: ":"
}

function get_text() 
{
    return $("#docbody").val();
}

function get_last_phrase(delim) {

    var textarea = get_text();
    for(var key in DELIM_CHAR_CODES) {
	textarea = textarea.replace(DELIM_CHAR_CODES[key], delim);
    }
    var sentences = textarea.split(delim);
    var last_sentence = sentences[sentences.length - 1];
    $("#buffer").html(jQuery.trim(last_sentence));
    var q = $("#buffer").html();
    console.log("last sentence: " + last_sentence);
    return q
}

$(function() {	
	$('#docbody').keypress(function(event) {
	
		if(event.which == '13') {		    
	    
		    var q = get_last_phrase('\n');

		    if (q.length > 0) {
			bing_search(q);
			doCI(q, 'nlp', 'ner');
		    }
		};
		if (event.which in DELIM_CHAR_CODES) {
		    var q = get_last_phrase(DELIM_CHAR_CODES[event.which]);

		    if (q.length > 0) {
			doCI(q, 'nlp', 'ner');
			bing_search(q);
		    }
		}

	    }); // close on selection listener
    });  // close DOM ready
