let Player = class {
	constructor() {
		this.x = 10;
		this.minX = -60;
		this.maxX = 1080;
		this.groundY = 320;
		this.y = this.groundY;
		this.yOffset = 0;
		this.hVelocity = 0;
		this.vVelocity = 0;
		this.runningSpeed = 12;
		this.jumpingSpeed = 30;
		this.fallingSpeed = 0.7;
		this.fallingAccel = 0.3;
		this.attack = 10;
		this.fallingSpeedOrig = this.fallingSpeed;
		this.maxHealth = 1000;
		this.health = this.maxHealth;
		this.playerId = 0;
		this.username = "";
		this.animTimer = (new Date()).getTime();
		this.attackTimer = (new Date()).getTime();
		this.img = "ichigoStand1";
		this.deadImg = "ichigoDead6";
		this.facingLeft = false;
		this.attacking = false;
		this.dead = false;
		this.musicPlayed = false;
	}
}