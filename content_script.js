console.log("content script");
var cards = [];

chrome.runtime.sendMessage(  
	{greeting: 'get-cards'},  
	function (response) {  
		cards = response
		$.each(cards, function(idx, obj) {
				if(42790 == obj["dbfId"]){
					console.log(obj);		
				}
			});
		
	});	
	
$(".class-icon").click(function(){
	//clearInterval(timer);
	console.log("click");
});

function translator(){
	console.log("translator");
	$("span.card-name").each(function (i,val){
		if(/^[a-zA-Z]/.test($(val).html())){
			$.each(cards, function(idx, obj) {
				if($(val).html() == obj["en_name"]){
					console.log(obj["en_name"]);
					$(val).html(obj["name"]);		
				}
			});
		}
	});
}

var timer = setInterval(function(){
		translator();
	},1000);