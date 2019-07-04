class Player {
	x = 10;
	minX = -60;
	maxX = 1080;
	groundY = 320;
	y = this.groundY;
	yOffset = 0;
	hVelocity = 0;
	vVelocity = 0;
	runningSpeed = 12;
	jumpingSpeed = 40;
	fallingSpeed = 0.4;
	fallingAccel = 0.2;
	attack = 10;
	fallingSpeedOrig = this.fallingSpeed;
	maxHealth = 1000;
	health = this.maxHealth;
	playerId = 0;
	username = "";
	animTimer = (new Date()).getTime();
	attackTimer = (new Date()).getTime();
	img = "ichigoStand1";
	deadImg = "ichigoDead6";
	facingLeft = false;
	attacking = false;
	dead = false;
	runAnim = [];
}