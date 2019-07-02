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
							"ichigoRun1" : loadImage("resources/ichigo/ichigoRun1.png"),
							"ichigoRun2" : loadImage("resources/ichigo/ichigoRun2.png"),
							"ichigoRun3" : loadImage("resources/ichigo/ichigoRun3.png"),
							"ichigoRun4" : loadImage("resources/ichigo/ichigoRun4.png"),
							"ichigoJump1" : loadImage("resources/ichigo/ichigoJump1.png"),
							"ichigoJump2" : loadImage("resources/ichigo/ichigoJump2.png"),
							"ichigoJump3" : loadImage("resources/ichigo/ichigoJump3.png"),
							"ichigoStand1Left" : loadImage("resources/ichigo/ichigoStand1Left.png"),
							"ichigoStand2Left" : loadImage("resources/ichigo/ichigoStand2Left.png"),
							"ichigoStand3Left" : loadImage("resources/ichigo/ichigoStand3Left.png"),
							"ichigoStand4Left" : loadImage("resources/ichigo/ichigoStand4Left.png"),
							"ichigoRun1Left" : loadImage("resources/ichigo/ichigoRun1Left.png"),
							"ichigoRun2Left" : loadImage("resources/ichigo/ichigoRun2Left.png"),
							"ichigoRun3Left" : loadImage("resources/ichigo/ichigoRun3Left.png"),
							"ichigoRun4Left" : loadImage("resources/ichigo/ichigoRun4Left.png"),
							"ichigoJump1Left" : loadImage("resources/ichigo/ichigoJump1Left.png"),
							"ichigoJump2Left" : loadImage("resources/ichigo/ichigoJump2Left.png"),
							"ichigoJump3Left" : loadImage("resources/ichigo/ichigoJump3Left.png"),
					 };
}

function getImage(pose) {
	return images[pose];
}

preloadImages();