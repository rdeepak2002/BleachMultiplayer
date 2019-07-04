var radius = 50;
var joyStickDirection = "none";

var sampleJoystick = {
    mode: 'static',
    position: {
      left: '25%',
      top: '50%'
    },
    size: radius*2,
    color: 'black'
};

var joystick;
var position;

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if( isMobile.any() ) {
  joystick = nipplejs.create(sampleJoystick);

  joystick.on('start', function(evt, data) {
    position = data;
  }).on('end', function(evt, data) {
    position = data;
    joyStickDirection = "none";
  }).on('move', function(evt, data) {
    position = data;
    if(position.direction == undefined) {
      joyStickDirection = "none";
    }
    else {
      joyStickDirection = position.direction.angle; 
    }
  }).on('dir:up plain:up dir:left plain:left dir:down' +
    'plain:down dir:right plain:right',
    function(evt, data) {
    //position=data;
  }).on('pressure', function(evt, data) {
    position=data;
  });
}