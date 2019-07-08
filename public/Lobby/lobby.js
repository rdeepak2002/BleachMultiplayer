var clientArr;
var maxRoomNumber = 2;
var characters = ["ichigo", "uryu"];
var curPlayer = 0;

function join(roomNumber) {
	if(clientArr != undefined) {
		if(clientArr[roomNumber-1] < maxRoomNumber) {
			sessionStorage.setItem("roomNumber", roomNumber);
			sessionStorage.setItem("type", characters[curPlayer]);
			window.location.href = "/play";
		}
	}
}

function signout() {
	sessionStorage.setItem("roomNumber", "");
	sessionStorage.setItem("username", "");
	window.location.href = "/";
}

function getNumClients() {
	var response = '';

	$.ajax({ type: "GET",
     url: "/getNumClients",
     async: true,
     success : function(res)
     {
				response = res;
				for(var i = 1; i < response.length+1; i++) {
					var numClients = response[i-1];
					var idTag = "#room"+ i;
					if(i > 5) {
						maxRoomNumber = 3;
					}
					else {
						maxRoomNumber = 2;
					}
					$(idTag).html(numClients + "/"+maxRoomNumber+" players");
					if(numClients < maxRoomNumber) {
						$(idTag).append('<span class="joinBtn" id="' + i + '" onclick="join(this.id)">Join</span>');
					}
				}
				clientArr = response;
     }
	});
}

function updateImageAndText() {
  $('#img').attr('src','/resources/characters/'+characters[curPlayer]+'Mugshot.png');
  $("#characterName").html(characters[curPlayer].toUpperCase())
}

$('#prevChar').on( {
    'click': function() {
    	curPlayer--;
    	if(curPlayer < 0) {
    		curPlayer = characters.length - 1;
    	}
    	updateImageAndText();
    }
});

$('#nextChar').on( {
    'click': function() {
    	curPlayer++;
    	if(curPlayer > characters.length-1) {
    		curPlayer = 0;
    	}
    	updateImageAndText();
    }
});

$(function() {
	var username = sessionStorage.getItem('username');

	if(username == undefined || username=="") {
		window.location.href = "/";
	}

	$(".label").html(username);

	getNumClients();
});

window.setInterval(function(){
	getNumClients();
	//console.log(document.getElementById('picker').value)
}, 1000);