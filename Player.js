class Player {
	x = 10;
	groundY = 290;
	y = this.groundY;
	yOffset = 0;
	hVelocity = 0;
	vVelocity = 0;
	runningSpeed = 12;
	jumpingSpeed = 40;
	fallingSpeed = 0.7;
	fallingAccel = 0.6;
	fallingSpeedOrig = 0.7;
	maxHealth = 1000;
	health = this.maxHealth;
	playerId = 0;
	username = "";
	animTimer = (new Date()).getTime();
	attackTimer = (new Date()).getTime();
	img = "ichigoStand1";
	facingLeft = false;
	attacking = false;
	runAnim = [];
}