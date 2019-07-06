let Player = class {
	constructor() {
		this.playerId = 0;
		this.ip = "";
		this.x = 0;
		this.minX = -1000;
		this.maxX = 1080;
		this.groundY = 530;
		this.y = this.groundY;
		this.teleportDistance = 400;
		this.centerOffset = -100;
		this.yOffset = 0;
		this.xOffset = 0;
		this.hVelocity = 0;
		this.vVelocity = 0;
		this.runningSpeed = 16;
		this.jumpingSpeed = 28;
		this.fallingSpeed = 0.4;
		this.fallingAccel = 0.1;
		this.attack = 100;
		this.fallingSpeedOrig = this.fallingSpeed;
		this.maxHealth = 1000;
		this.health = this.maxHealth;
		this.username = "";
		this.animTimer = (new Date()).getTime();
		this.img = "ichigoStand1";
		this.deadImg = "ichigoDead6";
		this.facingLeft = false;
		this.attacking = false;
		this.dead = false;
		this.musicPlayed = false;
		this.teleporting = false;
		this.guarding = false;
	}
}