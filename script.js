$(function() {
  var App = {};
  init(App)

  var cw = App.canvas.width;
  var ch = App.canvas.height;
  var fps = 30;
  var interval = 1000/fps;
  var lastTime = (new Date()).getTime();
  var currentTime = 0;
  var delta = 0;
  var playerArr;
  var curPlayer;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
      App.ctx.clearRect(0,0,cw,cw);

      if(Object.keys(App.playerArr).length > 0) {
        curPlayer = App.playerArr[App.playerId];

        curPlayer.x = curPlayer.x + curPlayer.hVelocity;

        curPlayer.y = curPlayer.y - curPlayer.vVelocity;

        if(curPlayer.y < curPlayer.groundY) {
          curPlayer.vVelocity -= curPlayer.fallingSpeed;curPlayer.fallingSpeed;
          curPlayer.fallingSpeed += curPlayer.fallingAccel;
        }
        else if (curPlayer.y > curPlayer.groundY){
          curPlayer.y = curPlayer.groundY;
          curPlayer.vVelocity = 0;
          curPlayer.fallingSpeed=curPlayer.fallingSpeedOrig;
        }

        if(curPlayer.x < -60) {
          curPlayer.x = -60;
        }

        if(curPlayer.x > 830) {
          curPlayer.x = 830;
        }

        App.ctx.drawImage(getImage("testLevel"), 0, 0, App.canvas.width, App.canvas.height);
        App.updatePlayer(App.playerId, curPlayer);
        animate();
        App.drawSprites();
      }
      else {
        App.ctx.font = "5rem Arial";
        App.ctx.fillStyle = "rgb(0, 0, 0)";
        App.ctx.fillText("LOADING...", 10, 40);
        console.log("loading...");
      }

      lastTime = currentTime - (delta % interval);
    }
  }

  // TODO: put animation in different class

  function animate() {
    var currentTime = (new Date()).getTime();
    var delta = (currentTime-curPlayer.animTimer);
    var speed = 100;
    var interval = speed * 4;

    if(curPlayer.y != curPlayer.groundY) {
      curPlayer.yOffset = 0;

      var numFrames = 5;
      speed = 300;
      interval = speed * numFrames;

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      var newImage = "ichigoJump" + curFrame;

      if(curPlayer.facingLeft)
        newImage = newImage + "Left";

      curPlayer.img = newImage;
    }
    else {
      if(curPlayer.hVelocity == 0) {
        curPlayer.yOffset = 0;

        var numFrames = 9;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoStand" + curFrame;

        if(curPlayer.facingLeft)
          newImage = newImage + "Left";

        curPlayer.img = newImage;
      }
      else if(curPlayer.hVelocity > 0) {
        curPlayer.facingLeft = false;
        curPlayer.yOffset = 40;

        var numFrames = 6;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoRun" + curFrame;

        curPlayer.img = newImage;
      }
      else if(curPlayer.hVelocity < 0) {
        curPlayer.facingLeft = true;
        curPlayer.yOffset = 40;

        var numFrames = 6;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoRun" + curFrame + "Left";

        curPlayer.img = newImage;
      }
    }

    curPlayer.animTimer = currentTime - (delta % interval);
  }

  // TODO: put key listener into different class
  $(document).keydown(function(event){
    key = String.fromCharCode(event.which);

    if(key == "D" || key == "d") {
      curPlayer.hVelocity = curPlayer.runningSpeed;
    }
    else if(key == "A" || key == "a") {
      curPlayer.hVelocity = -1*curPlayer.runningSpeed;
    }
  });  

  $(document).keyup(function(event){
    key = String.fromCharCode(event.which);

    if(key == "D" || key == "d") {
      curPlayer.hVelocity = 0;
    }
    if(key == "A" || key == "a") {
      curPlayer.hVelocity = 0;
    }
    if(key == "W" || key == "w") {
      if(curPlayer.y == curPlayer.groundY) {
        curPlayer.vVelocity = curPlayer.jumpingSpeed;
      }
    }
  });  

  gameLoop();
});
