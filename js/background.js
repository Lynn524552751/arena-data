var cards = {
	_cn : [],
	_us : [],
	init : function(){
		if(!cards._cn.length>0){cards._cn = getCardsByCN()}
		if(!cards._us.length>0){cards._us = getCardsByUS()}
		$.each(cards._cn, function(cn_idx, cn_obj) {
			$.each(cards._us, function(us_idx, us_obj) {
				if(cn_obj["dbfId"] == us_obj["dbfId"])
				{
					cards._cn[cn_idx]["en_name"] = us_obj["name"];
				}
			});
		});
		return "Cards Init"
	},
}
function getCardsByCN(){
	var data 
	$.ajax({
		url:"https://api.hearthstonejson.com/v1/latest/zhCN/cards.collectible.json",
		dataType: 'json',
		async: false,
		success:function(result){
			data = result;
    }});
	return data
}

function getCardsByUS(){
	var data 
	$.ajax({
		url:"https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json",
		dataType: 'json',
		async: false,
		success:function(result){
			data = result;
		}
	});
	return data
}
 
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if(request.cmd == "get-card"){ 
			var data =	getCardsByCN();	
			sendResponse(data);
		}
		if(request.cmd == "card-cn"){ 
			sendResponse("123"); 
		}
	}
);
	
chrome.runtime.onMessage.addListener(  
	function(request, sender, sendResponse) { 
		if(request.greeting == "get-cards"){
			cards.init()
			sendResponse(cards._cn); 
		}
		else{}
	}
);