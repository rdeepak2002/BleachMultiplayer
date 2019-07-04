function loadImage(path) {
	var image = new Image();   // Create new img element

	image.onload = function () {
	  console.log("loaded image");
	}

  image.src = path; // Set source path

  return image;
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
							"ichigoJump5Left" : loadImage("resources/ichigo/ichigoJump5Left.png"),

							"ichigoStrongAttack1" : loadImage("resources/ichigo/ichigoStrongAttack1.png"),
							"ichigoStrongAttack2" : loadImage("resources/ichigo/ichigoStrongAttack2.png"),
							"ichigoStrongAttack3" : loadImage("resources/ichigo/ichigoStrongAttack3.png"),
							"ichigoStrongAttack4" : loadImage("resources/ichigo/ichigoStrongAttack4.png"),
							"ichigoStrongAttack5" : loadImage("resources/ichigo/ichigoStrongAttack5.png"),
							"ichigoStrongAttack6" : loadImage("resources/ichigo/ichigoStrongAttack6.png"),
							"ichigoStrongAttack7" : loadImage("resources/ichigo/ichigoStrongAttack7.png"),
							"ichigoStrongAttack8" : loadImage("resources/ichigo/ichigoStrongAttack8.png"),
							"ichigoStrongAttack9" : loadImage("resources/ichigo/ichigoStrongAttack9.png"),

							"ichigoStrongAttack1Left" : loadImage("resources/ichigo/ichigoStrongAttack1Left.png"),
							"ichigoStrongAttack2Left" : loadImage("resources/ichigo/ichigoStrongAttack2Left.png"),
							"ichigoStrongAttack3Left" : loadImage("resources/ichigo/ichigoStrongAttack3Left.png"),
							"ichigoStrongAttack4Left" : loadImage("resources/ichigo/ichigoStrongAttack4Left.png"),
							"ichigoStrongAttack5Left" : loadImage("resources/ichigo/ichigoStrongAttack5Left.png"),
							"ichigoStrongAttack6Left" : loadImage("resources/ichigo/ichigoStrongAttack6Left.png"),
							"ichigoStrongAttack7Left" : loadImage("resources/ichigo/ichigoStrongAttack7Left.png"),
							"ichigoStrongAttack8Left" : loadImage("resources/ichigo/ichigoStrongAttack8Left.png"),
							"ichigoStrongAttack9Left" : loadImage("resources/ichigo/ichigoStrongAttack9Left.png"),

							"ichigoDead1" : loadImage("resources/ichigo/ichigoDeath1.png"),
							"ichigoDead2" : loadImage("resources/ichigo/ichigoDeath2.png"),
							"ichigoDead3" : loadImage("resources/ichigo/ichigoDeath3.png"),
							"ichigoDead4" : loadImage("resources/ichigo/ichigoDeath4.png"),
							"ichigoDead5" : loadImage("resources/ichigo/ichigoDeath5.png"),
							"ichigoDead6" : loadImage("resources/ichigo/ichigoDeath6.png"),

							"ichigoDead1Left" : loadImage("resources/ichigo/ichigoDeath1Left.png"),
							"ichigoDead2Left" : loadImage("resources/ichigo/ichigoDeath2Left.png"),
							"ichigoDead3Left" : loadImage("resources/ichigo/ichigoDeath3Left.png"),
							"ichigoDead4Left" : loadImage("resources/ichigo/ichigoDeath4Left.png"),
							"ichigoDead5Left" : loadImage("resources/ichigo/ichigoDeath5Left.png"),
							"ichigoDead6Left" : loadImage("resources/ichigo/ichigoDeath6Left.png"),

							"gameOverText"		: loadImage("resources/gameover.png")
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