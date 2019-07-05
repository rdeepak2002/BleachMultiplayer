let Player = class {
	constructor() {
		this.x = 0;
		this.minX = -1000;
		this.maxX = 1080;
		this.groundY = 530;
		this.y = this.groundY;
		this.teleportDistance = 400;
		this.centerOffset = -220;
		this.yOffset = 0;
		this.xOffset = 0;
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
		this.teleporting = false;
		this.guarding = false;
	}
}