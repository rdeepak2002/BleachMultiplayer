function createCookie() {
	var username = document.getElementById("form-name").value;  
	if(username != undefined || username != "") {

		sessionStorage.setItem('username', username);

		window.location.href = "/lobby";
	}
}