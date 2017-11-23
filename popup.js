var bg = chrome.extension.getBackgroundPage();

$(document).ready(function(){   
    $("#msg").text("Null");  
	console.log("Popup Init")
});

$("#run-btn").click(function(){
   var card = bg.getCardsByCN();
   $("#msg").text(card[0]["name"]);  
   console.log(card[0])
});