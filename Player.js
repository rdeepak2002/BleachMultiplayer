class Player {
	x = 10;
	y = 300; 		// 270
	hVelocity = 0;
	vVelocity = 0;
	runningSpeed = 12;
	jumpingSpeed = 40;
	fallingSpeed = 0.7;
	fallingAccel = 0.6;
	fallingSpeedOrig = 0.7;
	animTimer = (new Date()).getTime();
	img = "ichigoStand1";
	facingLeft = false;
	runAnim = [];
}