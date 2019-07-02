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

      console.log(App.playerArr.length)

      curPlayer = App.playerArr[App.playerId];

      curPlayer.x = curPlayer.x + curPlayer.hVelocity;

      if(curPlayer.hVelocity != 0) {
        App.updatePlayer(App.playerId, curPlayer)
      }

      //App.getPlayers()

      App.drawSprites()

      console.log("your id is: " + App.playerId)
      

      lastTime = currentTime - (delta % interval);
    }
  }

  // key events
  $(document).keydown(function(event){
    key = String.fromCharCode(event.which);

    if(key == "D") {
      curPlayer.hVelocity = 4;
    }

    else if(key == "A") {
      curPlayer.hVelocity = -4;
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
