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

        //if(curPlayer.hVelocity != 0) {
        App.updatePlayer(App.playerId, curPlayer);
        //}

        animate();
        App.drawSprites();
      }
      else {
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

    curPlayer.animTimer = currentTime - (delta % interval);

    if(curPlayer.hVelocity == 0) {
      speed = 200;
      interval = speed * 4;

      if(delta < speed) {
        if(curPlayer.facingLeft) {
          curPlayer.img = "ichigoStand1Left";
        }
        else {
          curPlayer.img = "ichigoStand1";
        }
      }
      else if(delta < 2 * speed) {
        if(curPlayer.facingLeft) {
          curPlayer.img = "ichigoStand2Left";
        }
        else {
          curPlayer.img = "ichigoStand2";
        }
      }
      else if(delta < 3 * speed) {
        if(curPlayer.facingLeft) {
          curPlayer.img = "ichigoStand3Left";
        }
        else {
          curPlayer.img = "ichigoStand3";
        }
      }
      else if(delta < 4 * speed){
        if(curPlayer.facingLeft) {
          curPlayer.img = "ichigoStand4Left";
        }
        else {
          curPlayer.img = "ichigoStand4";
        }
      } 
    }

    if(curPlayer.hVelocity > 0) {
      curPlayer.facingLeft = false;
      if(delta < speed) {
        curPlayer.img = "ichigoRun1";
      }
      else if(delta < 2 * speed) {
        curPlayer.img = "ichigoRun2";
      }
      else if(delta < 3 * speed) {
        curPlayer.img = "ichigoRun3";
      }
      else if(delta < 4 * speed) {
        curPlayer.img = "ichigoRun4";
      } 
    }

    if(curPlayer.hVelocity < 0) {
      curPlayer.facingLeft = true;
      if(delta < speed) {
        curPlayer.img = "ichigoRun1Left";
      }
      else if(delta < 2 * speed) {
        curPlayer.img = "ichigoRun2Left";
      }
      else if(delta < 3 * speed) {
        curPlayer.img = "ichigoRun3Left";
      }
      else if(delta < 4 * speed) {
        curPlayer.img = "ichigoRun4Left";
      } 
    }
  }

  // TODO: put key listener into different class
  $(document).keydown(function(event){
    key = String.fromCharCode(event.which);

    if(key == "D") {
      curPlayer.hVelocity = curPlayer.runningSpeed;
    }

    else if(key == "A") {
      curPlayer.hVelocity = -1*curPlayer.runningSpeed;
    }
  });  

  $(document).keyup(function(event){
    key = String.fromCharCode(event.which);

    if(key == "D") {
      curPlayer.hVelocity = 0;
    }
    if(key == "A") {
      curPlayer.hVelocity = 0;
    }
  });  

  gameLoop();
});
