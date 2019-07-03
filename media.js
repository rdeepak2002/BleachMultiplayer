function loadImage(path) {
	var image = new Image();   // Create new img element

  image.src = path; // Set source path

  return image
}

function preloadImages() {
	images = {
							"testLevel" : loadImage("resources/testLevel.png"),

							"ichigoStand1" : loadImage("resources/ichigo/ichigoStand1.png"),
							"ichigoStand2" : loadImage("resources/ichigo/ichigoStand2.png"),
							"ichigoStand3" : loadImage("resources/ichigo/ichigoStand3.png"),
							"ichigoStand4" : loadImage("resources/ichigo/ichigoStand4.png"),
							"ichigoStand5" : loadImage("resources/ichigo/ichigoStand5.png"),
							"ichigoStand6" : loadImage("resources/ichigo/ichigoStand6.png"),
							"ichigoStand7" : loadImage("resources/ichigo/ichigoStand7.png"),
							"ichigoStand8" : loadImage("resources/ichigo/ichigoStand8.png"),
							"ichigoStand9" : loadImage("resources/ichigo/ichigoStand9.png"),

							"ichigoStand1Left" : loadImage("resources/ichigo/ichigoStand1Left.png"),
							"ichigoStand2Left" : loadImage("resources/ichigo/ichigoStand2Left.png"),
							"ichigoStand3Left" : loadImage("resources/ichigo/ichigoStand3Left.png"),
							"ichigoStand4Left" : loadImage("resources/ichigo/ichigoStand4Left.png"),
							"ichigoStand5Left" : loadImage("resources/ichigo/ichigoStand5Left.png"),
							"ichigoStand6Left" : loadImage("resources/ichigo/ichigoStand6Left.png"),
							"ichigoStand7Left" : loadImage("resources/ichigo/ichigoStand7Left.png"),
							"ichigoStand8Left" : loadImage("resources/ichigo/ichigoStand8Left.png"),
							"ichigoStand9Left" : loadImage("resources/ichigo/ichigoStand9Left.png"),

							"ichigoRun1" : loadImage("resources/ichigo/ichigoRun1.png"),
							"ichigoRun2" : loadImage("resources/ichigo/ichigoRun2.png"),
							"ichigoRun3" : loadImage("resources/ichigo/ichigoRun3.png"),
							"ichigoRun4" : loadImage("resources/ichigo/ichigoRun4.png"),
							"ichigoRun5" : loadImage("resources/ichigo/ichigoRun5.png"),
							"ichigoRun6" : loadImage("resources/ichigo/ichigoRun6.png"),

							"ichigoRun1Left" : loadImage("resources/ichigo/ichigoRun1Left.png"),
							"ichigoRun2Left" : loadImage("resources/ichigo/ichigoRun2Left.png"),
							"ichigoRun3Left" : loadImage("resources/ichigo/ichigoRun3Left.png"),
							"ichigoRun4Left" : loadImage("resources/ichigo/ichigoRun4Left.png"),
							"ichigoRun5Left" : loadImage("resources/ichigo/ichigoRun5Left.png"),
							"ichigoRun6Left" : loadImage("resources/ichigo/ichigoRun6Left.png"),

							"ichigoJump1" : loadImage("resources/ichigo/ichigoJump1.png"),
							"ichigoJump2" : loadImage("resources/ichigo/ichigoJump2.png"),
							"ichigoJump3" : loadImage("resources/ichigo/ichigoJump3.png"),
							"ichigoJump4" : loadImage("resources/ichigo/ichigoJump4.png"),
							"ichigoJump5" : loadImage("resources/ichigo/ichigoJump5.png"),

							"ichigoJump1Left" : loadImage("resources/ichigo/ichigoJump1Left.png"),
							"ichigoJump2Left" : loadImage("resources/ichigo/ichigoJump2Left.png"),
							"ichigoJump3Left" : loadImage("resources/ichigo/ichigoJump3Left.png"),
							"ichigoJump4Left" : loadImage("resources/ichigo/ichigoJump4Left.png"),
							"ichigoJump5Left" : loadImage("resources/ichigo/ichigoJump5Left.png")
					 };
}

function getImage(pose) {
	return images[pose];
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

preloadImages();