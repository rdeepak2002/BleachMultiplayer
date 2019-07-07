let Sprite = class {
	constructor(playerId, x, y) {
		this.spriteId = 0;
		this.playerId = playerId;
		this.x = 0;
		this.y = 0;
		this.room = -1;
		this.yOffset = 200;
		this.hVelocity = 20;
		this.negHVelocity = -20;
		this.vVelocity = 0;
		this.attack = 100;
		this.animTimer = (new Date()).getTime();
		this.img = "getsuga1";
		this.width = 1;
		this.height = 1;
		this.maxWidth = 250;
		this.maxHeight = 250;
		this.growthSpeed = 20;
		this.facingLeft = false;
		this.visible = true;
	}
}