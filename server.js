var express = require("express");
var app = express();

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname))

app.get('/', function(req, res){
	res.sendFile( __dirname + "/game.html" );
});

app.listen(app.get('port'));

// (function() {
//   var io;
//   io = require('socket.io').listen(4000);
//   io.sockets.on('connection', function(socket) {
//     socket.on('drawClick', function(data) {
//       socket.broadcast.emit('draw', {
//         x: data.x,
//         y: data.y,
//         type: data.type
//       });
//     });
//   });
// }).call(this);
