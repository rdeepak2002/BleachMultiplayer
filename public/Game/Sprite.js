let Sprite = class {
	constructor(playerId, x, y) {
		this.spriteId = 0;
		this.playerId = playerId;
		this.x = 0;
		this.y = 0;
		this.yOffset = 200;
		this.hVelocity = 20;
		this.negHVelocity = -20;
		this.vVelocity = 0;
		this.attack = 100;
		this.animTimer = (new Date()).getTime();
		this.img = "getsuga1";
		this.width = 100;
		this.height = 100;
		this.maxWidth = 500;
		this.maxHeight = 400;
		this.growthSpeed = 4;
		this.facingLeft = false;
		this.visible = true;
	}
}