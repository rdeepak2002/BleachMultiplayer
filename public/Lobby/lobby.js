$(function() {
	function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}

	var username = getCookie("username");

	if(username == undefined || username=="") {
		window.location.href = "/";
	}
});

function join(roomNumber) {
	document.cookie = "roomNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "roomNumber=" + roomNumber
	window.location.href = "/play";
}

function signout() {
	document.cookie = "roomNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "/";
}