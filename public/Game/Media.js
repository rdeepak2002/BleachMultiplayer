var images = {};
var size = 10000;
var numLoaded = 0;

function loadImage(path) {
	var image = new Image();   // Create new img element

	image.onload = function () {
	  numLoaded++;
	}

  image.src = path; // Set source path

  return image;
}

function preloadMedia() {
	images = {
							"testLevel" : loadImage("resources/testLevel.png"),

							"level1Bg" : loadImage("resources/level1Bg.png"),
							"level1Fg" : loadImage("resources/level1Fg.png"),
							"level1Pillar" : loadImage("resources/level1Pillar.png"),

							"getsuga1" : loadImage("resources/ichigo/getsuga1.png"),
							"getsuga1Left" : loadImage("resources/ichigo/getsuga1Left.png"),

							"ichigoHealthBarIcon" : loadImage("resources/ichigo/ichigoHealthBarIcon.png"),
							"getsugaBarIcon" : loadImage("resources/ichigo/getsugaBarIcon.png"),

							"ichigoStand1" : loadImage("resources/ichigo/ichigoStand1.png"),
							"ichigoStand2" : loadImage("resources/ichigo/ichigoStand2.png"),
							"ichigoStand3" : loadImage("resources/ichigo/ichigoStand3.png"),
							"ichigoStand4" : loadImage("resources/ichigo/ichigoStand4.png"),
							"ichigoStand5" : loadImage("resources/ichigo/ichigoStand5.png"),
							"ichigoStand6" : loadImage("resources/ichigo/ichigoStand6.png"),
							"ichigoStand7" : loadImage("resources/ichigo/ichigoStand7.png"),
							"ichigoStand8" : loadImage("resources/ichigo/ichigoStand8.png"),
							"ichigoStand9" : loadImage("resources/ichigo/ichigoStand9.png"),

							"ichigoStand1Left" : loadImage("resources/ichigo/ichigoStand1Left.png"),
							"ichigoStand2Left" : loadImage("resources/ichigo/ichigoStand2Left.png"),
							"ichigoStand3Left" : loadImage("resources/ichigo/ichigoStand3Left.png"),
							"ichigoStand4Left" : loadImage("resources/ichigo/ichigoStand4Left.png"),
							"ichigoStand5Left" : loadImage("resources/ichigo/ichigoStand5Left.png"),
							"ichigoStand6Left" : loadImage("resources/ichigo/ichigoStand6Left.png"),
							"ichigoStand7Left" : loadImage("resources/ichigo/ichigoStand7Left.png"),
							"ichigoStand8Left" : loadImage("resources/ichigo/ichigoStand8Left.png"),
							"ichigoStand9Left" : loadImage("resources/ichigo/ichigoStand9Left.png"),

							"ichigoRun1" : loadImage("resources/ichigo/ichigoRun1.png"),
							"ichigoRun2" : loadImage("resources/ichigo/ichigoRun2.png"),
							"ichigoRun3" : loadImage("resources/ichigo/ichigoRun3.png"),
							"ichigoRun4" : loadImage("resources/ichigo/ichigoRun4.png"),
							"ichigoRun5" : loadImage("resources/ichigo/ichigoRun5.png"),
							"ichigoRun6" : loadImage("resources/ichigo/ichigoRun6.png"),

							"ichigoRun1Left" : loadImage("resources/ichigo/ichigoRun1Left.png"),
							"ichigoRun2Left" : loadImage("resources/ichigo/ichigoRun2Left.png"),
							"ichigoRun3Left" : loadImage("resources/ichigo/ichigoRun3Left.png"),
							"ichigoRun4Left" : loadImage("resources/ichigo/ichigoRun4Left.png"),
							"ichigoRun5Left" : loadImage("resources/ichigo/ichigoRun5Left.png"),
							"ichigoRun6Left" : loadImage("resources/ichigo/ichigoRun6Left.png"),

							"ichigoJump1" : loadImage("resources/ichigo/ichigoJump1.png"),
							"ichigoJump2" : loadImage("resources/ichigo/ichigoJump2.png"),
							"ichigoJump3" : loadImage("resources/ichigo/ichigoJump3.png"),
							"ichigoJump4" : loadImage("resources/ichigo/ichigoJump4.png"),
							"ichigoJump5" : loadImage("resources/ichigo/ichigoJump5.png"),

							"ichigoJump1Left" : loadImage("resources/ichigo/ichigoJump1Left.png"),
							"ichigoJump2Left" : loadImage("resources/ichigo/ichigoJump2Left.png"),
							"ichigoJump3Left" : loadImage("resources/ichigo/ichigoJump3Left.png"),
							"ichigoJump4Left" : loadImage("resources/ichigo/ichigoJump4Left.png"),
							"ichigoJump5Left" : loadImage("resources/ichigo/ichigoJump5Left.png"),

							"ichigoStrongAttack1" : loadImage("resources/ichigo/ichigoStrongAttack1.png"),
							"ichigoStrongAttack2" : loadImage("resources/ichigo/ichigoStrongAttack2.png"),
							"ichigoStrongAttack3" : loadImage("resources/ichigo/ichigoStrongAttack3.png"),
							"ichigoStrongAttack4" : loadImage("resources/ichigo/ichigoStrongAttack4.png"),
							"ichigoStrongAttack5" : loadImage("resources/ichigo/ichigoStrongAttack5.png"),
							"ichigoStrongAttack6" : loadImage("resources/ichigo/ichigoStrongAttack6.png"),
							"ichigoStrongAttack7" : loadImage("resources/ichigo/ichigoStrongAttack7.png"),
							"ichigoStrongAttack8" : loadImage("resources/ichigo/ichigoStrongAttack8.png"),
							"ichigoStrongAttack9" : loadImage("resources/ichigo/ichigoStrongAttack9.png"),

							"ichigoStrongAttack1Left" : loadImage("resources/ichigo/ichigoStrongAttack1Left.png"),
							"ichigoStrongAttack2Left" : loadImage("resources/ichigo/ichigoStrongAttack2Left.png"),
							"ichigoStrongAttack3Left" : loadImage("resources/ichigo/ichigoStrongAttack3Left.png"),
							"ichigoStrongAttack4Left" : loadImage("resources/ichigo/ichigoStrongAttack4Left.png"),
							"ichigoStrongAttack5Left" : loadImage("resources/ichigo/ichigoStrongAttack5Left.png"),
							"ichigoStrongAttack6Left" : loadImage("resources/ichigo/ichigoStrongAttack6Left.png"),
							"ichigoStrongAttack7Left" : loadImage("resources/ichigo/ichigoStrongAttack7Left.png"),
							"ichigoStrongAttack8Left" : loadImage("resources/ichigo/ichigoStrongAttack8Left.png"),
							"ichigoStrongAttack9Left" : loadImage("resources/ichigo/ichigoStrongAttack9Left.png"),

							"ichigoStrongAirAttack1" : loadImage("resources/ichigo/ichigoAirAttack1.png"),
							"ichigoStrongAirAttack2" : loadImage("resources/ichigo/ichigoAirAttack2.png"),
							"ichigoStrongAirAttack3" : loadImage("resources/ichigo/ichigoAirAttack3.png"),
							"ichigoStrongAirAttack4" : loadImage("resources/ichigo/ichigoAirAttack4.png"),
							"ichigoStrongAirAttack5" : loadImage("resources/ichigo/ichigoAirAttack5.png"),
							"ichigoStrongAirAttack6" : loadImage("resources/ichigo/ichigoAirAttack6.png"),
							"ichigoStrongAirAttack7" : loadImage("resources/ichigo/ichigoAirAttack7.png"),

							"ichigoStrongAirAttack1Left" : loadImage("resources/ichigo/ichigoAirAttack1Left.png"),
							"ichigoStrongAirAttack2Left" : loadImage("resources/ichigo/ichigoAirAttack2Left.png"),
							"ichigoStrongAirAttack3Left" : loadImage("resources/ichigo/ichigoAirAttack3Left.png"),
							"ichigoStrongAirAttack4Left" : loadImage("resources/ichigo/ichigoAirAttack4Left.png"),
							"ichigoStrongAirAttack5Left" : loadImage("resources/ichigo/ichigoAirAttack5Left.png"),
							"ichigoStrongAirAttack6Left" : loadImage("resources/ichigo/ichigoAirAttack6Left.png"),
							"ichigoStrongAirAttack7Left" : loadImage("resources/ichigo/ichigoAirAttack7Left.png"),

							"ichigoDead1" : loadImage("resources/ichigo/ichigoDeath1.png"),
							"ichigoDead2" : loadImage("resources/ichigo/ichigoDeath2.png"),
							"ichigoDead3" : loadImage("resources/ichigo/ichigoDeath3.png"),
							"ichigoDead4" : loadImage("resources/ichigo/ichigoDeath4.png"),
							"ichigoDead5" : loadImage("resources/ichigo/ichigoDeath5.png"),
							"ichigoDead6" : loadImage("resources/ichigo/ichigoDeath6.png"),

							"ichigoDead1Left" : loadImage("resources/ichigo/ichigoDeath1Left.png"),
							"ichigoDead2Left" : loadImage("resources/ichigo/ichigoDeath2Left.png"),
							"ichigoDead3Left" : loadImage("resources/ichigo/ichigoDeath3Left.png"),
							"ichigoDead4Left" : loadImage("resources/ichigo/ichigoDeath4Left.png"),
							"ichigoDead5Left" : loadImage("resources/ichigo/ichigoDeath5Left.png"),
							"ichigoDead6Left" : loadImage("resources/ichigo/ichigoDeath6Left.png"),

							"ichigoTeleport1" : loadImage("resources/ichigo/ichigoTeleport1.png"),
							"ichigoTeleport2" : loadImage("resources/ichigo/ichigoTeleport2.png"),
							"ichigoTeleport3" : loadImage("resources/ichigo/ichigoTeleport3.png"),

							"ichigoTeleport1Left" : loadImage("resources/ichigo/ichigoTeleport1Left.png"),
							"ichigoTeleport2Left" : loadImage("resources/ichigo/ichigoTeleport2Left.png"),
							"ichigoTeleport3Left" : loadImage("resources/ichigo/ichigoTeleport3Left.png"),

							"ichigoDamage1" : loadImage("resources/ichigo/ichigoDamage1.png"),
							"ichigoDamage2" : loadImage("resources/ichigo/ichigoDamage2.png"),

							"ichigoDamage1Left" : loadImage("resources/ichigo/ichigoDamage1Left.png"),
							"ichigoDamage2Left" : loadImage("resources/ichigo/ichigoDamage2Left.png"),

							"ichigoGuard1" : loadImage("resources/ichigo/ichigoGuard1.png"),

							"ichigoGuard1Left" : loadImage("resources/ichigo/ichigoGuard1Left.png"),

							"arrow" : loadImage("resources/uryu/arrow.png"),
							"arrowLeft" : loadImage("resources/uryu/arrowLeft.png"),

							"uryuStand1" : loadImage("resources/uryu/uryuStand1.png"),
							"uryuStand2" : loadImage("resources/uryu/uryuStand2.png"),
							"uryuStand3" : loadImage("resources/uryu/uryuStand3.png"),
							"uryuStand4" : loadImage("resources/uryu/uryuStand4.png"),

							"uryuStand1Left" : loadImage("resources/uryu/uryuStand1Left.png"),
							"uryuStand2Left" : loadImage("resources/uryu/uryuStand2Left.png"),
							"uryuStand3Left" : loadImage("resources/uryu/uryuStand3Left.png"),
							"uryuStand4Left" : loadImage("resources/uryu/uryuStand4Left.png"),				

							"uryuRun1" : loadImage("resources/uryu/uryuRun1.png"),
							"uryuRun2" : loadImage("resources/uryu/uryuRun2.png"),
							"uryuRun3" : loadImage("resources/uryu/uryuRun3.png"),
							"uryuRun4" : loadImage("resources/uryu/uryuRun4.png"),

							"uryuRun1Left" : loadImage("resources/uryu/uryuRun1Left.png"),
							"uryuRun2Left" : loadImage("resources/uryu/uryuRun2Left.png"),
							"uryuRun3Left" : loadImage("resources/uryu/uryuRun3Left.png"),
							"uryuRun4Left" : loadImage("resources/uryu/uryuRun4Left.png"),

							"uryuStrongAttack1" : loadImage("resources/uryu/uryuStrongAttack1.png"),
							"uryuStrongAttack2" : loadImage("resources/uryu/uryuStrongAttack2.png"),
							"uryuStrongAttack3" : loadImage("resources/uryu/uryuStrongAttack3.png"),
							"uryuStrongAttack4" : loadImage("resources/uryu/uryuStrongAttack4.png"),
							"uryuStrongAttack5" : loadImage("resources/uryu/uryuStrongAttack5.png"),
							"uryuStrongAttack6" : loadImage("resources/uryu/uryuStrongAttack6.png"),
							"uryuStrongAttack7" : loadImage("resources/uryu/uryuStrongAttack7.png"),
							"uryuStrongAttack8" : loadImage("resources/uryu/uryuStrongAttack8.png"),
							"uryuStrongAttack9" : loadImage("resources/uryu/uryuStrongAttack9.png"),

							"uryuStrongAttack1Left" : loadImage("resources/uryu/uryuStrongAttack1Left.png"),
							"uryuStrongAttack2Left" : loadImage("resources/uryu/uryuStrongAttack2Left.png"),
							"uryuStrongAttack3Left" : loadImage("resources/uryu/uryuStrongAttack3Left.png"),
							"uryuStrongAttack4Left" : loadImage("resources/uryu/uryuStrongAttack4Left.png"),
							"uryuStrongAttack5Left" : loadImage("resources/uryu/uryuStrongAttack5Left.png"),
							"uryuStrongAttack6Left" : loadImage("resources/uryu/uryuStrongAttack6Left.png"),
							"uryuStrongAttack7Left" : loadImage("resources/uryu/uryuStrongAttack7Left.png"),
							"uryuStrongAttack8Left" : loadImage("resources/uryu/uryuStrongAttack8Left.png"),
							"uryuStrongAttack9Left" : loadImage("resources/uryu/uryuStrongAttack9Left.png"),

							"uryuStrongAirAttack1" : loadImage("resources/uryu/uryuStrongAirAttack1.png"),
							"uryuStrongAirAttack2" : loadImage("resources/uryu/uryuStrongAirAttack2.png"),
							"uryuStrongAirAttack3" : loadImage("resources/uryu/uryuStrongAirAttack3.png"),
							"uryuStrongAirAttack4" : loadImage("resources/uryu/uryuStrongAirAttack4.png"),
							"uryuStrongAirAttack5" : loadImage("resources/uryu/uryuStrongAirAttack5.png"),
							"uryuStrongAirAttack6" : loadImage("resources/uryu/uryuStrongAirAttack6.png"),
							"uryuStrongAirAttack7" : loadImage("resources/uryu/uryuStrongAirAttack7.png"),
							"uryuStrongAirAttack8" : loadImage("resources/uryu/uryuStrongAirAttack8.png"),
							"uryuStrongAirAttack9" : loadImage("resources/uryu/uryuStrongAirAttack9.png"),

							"uryuStrongAirAttack1Left" : loadImage("resources/uryu/uryuStrongAirAttack1Left.png"),
							"uryuStrongAirAttack2Left" : loadImage("resources/uryu/uryuStrongAirAttack2Left.png"),
							"uryuStrongAirAttack3Left" : loadImage("resources/uryu/uryuStrongAirAttack3Left.png"),
							"uryuStrongAirAttack4Left" : loadImage("resources/uryu/uryuStrongAirAttack4Left.png"),
							"uryuStrongAirAttack5Left" : loadImage("resources/uryu/uryuStrongAirAttack5Left.png"),
							"uryuStrongAirAttack6Left" : loadImage("resources/uryu/uryuStrongAirAttack6Left.png"),
							"uryuStrongAirAttack7Left" : loadImage("resources/uryu/uryuStrongAirAttack7Left.png"),
							"uryuStrongAirAttack8Left" : loadImage("resources/uryu/uryuStrongAirAttack8Left.png"),
							"uryuStrongAirAttack9Left" : loadImage("resources/uryu/uryuStrongAirAttack9Left.png"),

							"uryuGuard1" : loadImage("resources/uryu/uryuGuard1.png"),

							"uryuGuard1Left" : loadImage("resources/uryu/uryuGuard1Left.png"),							

							"uryuTeleport1" : loadImage("resources/uryu/uryuTeleport1.png"),
							"uryuTeleport2" : loadImage("resources/uryu/uryuTeleport2.png"),
							"uryuTeleport3" : loadImage("resources/uryu/uryuTeleport3.png"),

							"uryuTeleport1Left" : loadImage("resources/uryu/uryuTeleport1Left.png"),
							"uryuTeleport2Left" : loadImage("resources/uryu/uryuTeleport2Left.png"),
							"uryuTeleport3Left" : loadImage("resources/uryu/uryuTeleport3Left.png"),

							"uryuJump1" : loadImage("resources/uryu/uryuJump1.png"),
							"uryuJump2" : loadImage("resources/uryu/uryuJump2.png"),
							"uryuJump3" : loadImage("resources/uryu/uryuJump3.png"),
							"uryuJump4" : loadImage("resources/uryu/uryuJump4.png"),
							"uryuJump5" : loadImage("resources/uryu/uryuJump5.png"),
							"uryuJump6" : loadImage("resources/uryu/uryuJump6.png"),

							"uryuJump1Left" : loadImage("resources/uryu/uryuJump1Left.png"),
							"uryuJump2Left" : loadImage("resources/uryu/uryuJump2Left.png"),
							"uryuJump3Left" : loadImage("resources/uryu/uryuJump3Left.png"),
							"uryuJump4Left" : loadImage("resources/uryu/uryuJump4Left.png"),
							"uryuJump5Left" : loadImage("resources/uryu/uryuJump5Left.png"),
							"uryuJump6Left" : loadImage("resources/uryu/uryuJump6Left.png"),

							"uryuDamage1" : loadImage("resources/uryu/uryuDamage1.png"),
							"uryuDamage2" : loadImage("resources/uryu/uryuDamage2.png"),

							"uryuDamage1Left" : loadImage("resources/uryu/uryuDamage1Left.png"),
							"uryuDamage2Left" : loadImage("resources/uryu/uryuDamage2Left.png"),

							"uryuDead1" : loadImage("resources/uryu/uryuDeath1.png"),
							"uryuDead2" : loadImage("resources/uryu/uryuDeath2.png"),
							"uryuDead3" : loadImage("resources/uryu/uryuDeath3.png"),
							"uryuDead4" : loadImage("resources/uryu/uryuDeath4.png"),
							"uryuDead5" : loadImage("resources/uryu/uryuDeath5.png"),
							"uryuDead6" : loadImage("resources/uryu/uryuDeath6.png"),

							"uryuDead1Left" : loadImage("resources/uryu/uryuDeath1Left.png"),
							"uryuDead2Left" : loadImage("resources/uryu/uryuDeath2Left.png"),
							"uryuDead3Left" : loadImage("resources/uryu/uryuDeath3Left.png"),
							"uryuDead4Left" : loadImage("resources/uryu/uryuDeath4Left.png"),
							"uryuDead5Left" : loadImage("resources/uryu/uryuDeath5Left.png"),
							"uryuDead6Left" : loadImage("resources/uryu/uryuDeath6Left.png"),


							"gameOverText"		: loadImage("resources/gameover.png"),

							"pauseBtn"		: loadImage("resources/pauseBtn.png")
					 };
}

function getImage(pose) {
	return images[pose];
}

// function getCookie(name) {
//   var value = "; " + document.cookie;
//   var parts = value.split("; " + name + "=");
//   if (parts.length == 2) return parts.pop().split(";").shift();
// }

preloadMedia();

size = Object.keys(images).length;
