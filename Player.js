class Player {
	x = 10;
	y = 100;
	hVelocity = 0;
	runningSpeed = 6;
	animTimer = (new Date()).getTime();

	img = "ichigoStand1";
	facingLeft = false;
	runAnim = []

	getY() {
		return this.y;
	}

	getX() {
		return this.x;
	}

	gethVelocity() {
		return this.hVelocity
	}

	getImg() {
		return this.img;
	}

	setX(x) {
		this.x = x;
	}

	setY(y) {
		this.y = y;
	}

	sethVelocity(hVelocity) {
		this.hVelocity = hVelocity;
	}
}