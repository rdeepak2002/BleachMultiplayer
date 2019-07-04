$(function() {
  var App = {};
  init(App)

  var cw = App.canvas.width;
  var ch = App.canvas.height;
  var fps =60;
  var interval = 1000/fps;
  var lastTime = (new Date()).getTime();
  var currentTime = 0;
  var delta = 0;
  var curPlayer;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
      App.ctx.clearRect(0,0,cw,cw);

      if(Object.keys(App.playerArr).length > 0) {
        curPlayer = App.playerArr[App.playerId];

        manageKeyEvents(curPlayer);
        App.ctx.drawImage(getImage("testLevel"), 0, 0, App.canvas.width, App.canvas.height);

        animate(curPlayer, App);
        updatePlayerState(curPlayer, delta);
        if(curPlayer.dead == false)
          checkPlayerAttack(curPlayer, App.playerArr, App);

        App.updatePlayer(App.playerId, curPlayer);

        App.drawSprites(curPlayer);
        App.drawGui(curPlayer);
      }
      else {
        App.ctx.font = "5rem Arial";
        App.ctx.fillStyle = "rgb(0, 0, 0)";
        App.ctx.fillText("LOADING...", 10, 70);
        console.log("loading...");
      }

      lastTime = currentTime - (delta % interval);
    }
  }

  gameLoop();
});
