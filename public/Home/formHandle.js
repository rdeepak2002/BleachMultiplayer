function createCookie() {
	var username = document.getElementById("form-name").value;  

	if(username != undefined || username != "") {
		document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

		document.cookie = "username=" + username;

		window.location.href = "/lobby";
	}
}