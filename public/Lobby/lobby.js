$(function() {
	var username = sessionStorage.getItem('username');

	if(username == undefined || username=="") {
		window.location.href = "/";
	}
});

function join(roomNumber) {
	sessionStorage.setItem("roomNumber", roomNumber);
	window.location.href = "/play";
}

function signout() {
	sessionStorage.setItem("roomNumber", "");
	sessionStorage.setItem("username", "");
	window.location.href = "/";
}