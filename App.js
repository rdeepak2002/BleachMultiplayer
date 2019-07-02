/*
  Init 
*/
function init(app) {
  app.canvas = document.createElement('canvas');
  app.canvas.height = 400;
  app.canvas.width = 800;
  document.getElementsByTagName('article')[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");
  app.ctx.fillStyle = "solid";
  app.ctx.strokeStyle = "#ECD018";
  app.ctx.lineWidth = 5;
  app.ctx.lineCap = "round";

  app.socket = io();
  app.socket.on('log', function(data) {
    console.log(data);
  });
  app.socket.on('draw', function(data) {
    return app.drawImage(data.x, data.y)
  });

  app.drawImage = function(x, y) {

    var img = new Image();   // Create new img element

    img.addEventListener('load', function() {
      app.ctx.drawImage(img, x, y);
    }, false);

    img.src = 'ichigor.png'; // Set source path
  }
};
