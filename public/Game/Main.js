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
  var curPlayer;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
      App.ctx.clearRect(0,0,cw,cw);

      if(Object.keys(App.playerArr).length > 0 && numLoaded == size) {
        curPlayer = App.playerArr[App.playerId];

        manageKeyEvents(curPlayer, App);

        var levelBg = getImage("level1Bg");
        var levelFg = getImage("level1Fg");
        var levelPillar = getImage("level1Pillar");

        var scale = App.canvas.height / getImage("level1Bg").naturalHeight;

        var paralaxSpeed = 10;

        App.ctx.drawImage(levelBg, 0-curPlayer.x/paralaxSpeed-levelBg.naturalWidth/2, 0, levelBg.naturalWidth * scale, App.canvas.height);

        App.ctx.drawImage(levelBg, 1*(levelBg.naturalWidth * scale) + 0-curPlayer.x/paralaxSpeed-levelBg.naturalWidth/2, 0, levelBg.naturalWidth * scale, App.canvas.height);

        App.ctx.drawImage(levelBg, 2*(levelBg.naturalWidth * scale) + 0-curPlayer.x/paralaxSpeed-levelBg.naturalWidth/2, 0, levelBg.naturalWidth * scale, App.canvas.height);

        App.ctx.drawImage(levelFg, 0-curPlayer.x-levelFg.naturalWidth/2, -560, levelFg.naturalWidth * scale*1.7, App.canvas.height*1.7);

        var leftPillarX  = App.canvas.width/2 + player.centerOffset + curPlayer.minX-curPlayer.x - levelPillar.naturalWidth;
        var rightPillarX  = App.canvas.width/2 + player.centerOffset + curPlayer.maxX-curPlayer.x + levelPillar.naturalWidth+30;
        var pillarYOffset = 200;

        App.ctx.drawImage(levelPillar, leftPillarX, pillarYOffset, levelPillar.naturalWidth * scale, levelPillar.naturalHeight * scale);
        App.ctx.drawImage(levelPillar, leftPillarX, pillarYOffset - levelPillar.naturalHeight, levelPillar.naturalWidth * scale, levelPillar.naturalHeight * scale);

        App.ctx.drawImage(levelPillar, rightPillarX, pillarYOffset, levelPillar.naturalWidth * scale, levelPillar.naturalHeight * scale);
        App.ctx.drawImage(levelPillar, rightPillarX, pillarYOffset - levelPillar.naturalHeight, levelPillar.naturalWidth * scale, levelPillar.naturalHeight * scale);


        animate(curPlayer, App);
        updatePlayerState(curPlayer, delta);

        if(curPlayer.dead == false)
          checkPlayerAttack(curPlayer, App.playerArr, App);

        updateSprites(App, curPlayer, delta);

        App.updatePlayer(App.playerId, curPlayer);

        App.drawSprites(curPlayer);
        App.drawGui(curPlayer);
      }
      else {
        App.ctx.font = "5rem Arial";
        App.ctx.fillStyle = "rgb(255, 255, 255)";
        //var percent = numLoaded + "/" + size;
        var percent = Math.round(100*(1.0*numLoaded/size));
        App.ctx.fillText("LOADING: " + percent + "%", 10, 70);
      }

      lastTime = currentTime - (delta % interval);
    }
  }

  gameLoop();

  setInterval(function () {         // if off tab, use setTimeout to update player state
    if(isTabActive == false) {
      setTimeout(gameLoop, interval);
    }
  }, interval);
});