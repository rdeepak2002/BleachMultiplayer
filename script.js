$(function() {
  var App = {};
  init(App)

  $(document).keypress(function(event){
    alert(String.fromCharCode(event.which)); 
  });

  /*
    Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    App.drawImage(x, y)
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type
    });
  });

  cw = App.canvas.width,
  ch = App.canvas.height,
  cx = null,
  fps = 30,
  bX = 30,
  bY = 30,
  mX = 10,
  mY = 20,
  interval     =    1000/fps,
  lastTime     =    (new Date()).getTime(),
  currentTime  =    0,
  delta = 0;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    
    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    console.log("test")

    if(delta > interval) {
    
        //App.ctx.clearRect(0,0,cw,cw);
        
        App.ctx.beginPath();
        App.ctx.fillStyle = 'red';
        App.ctx.arc(bX, bY, 20, 0, Math.PI * 360);
        App.ctx.fill();
        if(bX >= cw || bX <= 0) { mX*=-1; }
        if(bY >= ch || bY <= 0) { mY*=-1; }
        
        bX+=mX;
        bY+=mY;
        
        lastTime = currentTime - (delta % interval);
    }
  }  

  gameLoop();
});
