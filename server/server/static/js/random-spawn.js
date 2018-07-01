//console.log(NAF);

AFRAME.registerComponent('spawn-in-circle', {
  schema: {
    radius: {type: 'number', default: 1}
  },

  init: function() {

    // prevent this init logic from firing more than once when element is
    // detached and reattached
    if (this.el.initialized) return
    this.el.initialized = true

    var el = this.el;

    var center = el.getAttribute('position');

    var angleRad = this.getRandomAngleInRadians();
    var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
    var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
    el.setAttribute('position', worldPoint);

    var angleDeg = angleRad * 180 / Math.PI;
    var angleToCenter = -1 * angleDeg + 90;
    var rotationStr = '0 ' + angleToCenter + ' 0';
    el.setAttribute('rotation', rotationStr);
  },

  getRandomAngleInRadians: function() {
    return Math.random()*Math.PI*2;
  },

  randomPointOnCircle: function (radius, angleRad) {
    x = Math.cos(angleRad)*radius;
    y = Math.sin(angleRad)*radius;
    return {x: x, y: y};
  }
});

function onConnect(data) {
  console.log("on connect");
  console.log(data);
  console.log("NAF");
  console.log(NAF);
  //window.postMessage({ type: 'SS_UI_REQUEST', text: 'start' }, '*');

  //$('#localVideo').play();
  //console.log($('#aframevideo'));
  //$('#aframevideo').play();
}
// var playing = false;
// $(document).keypress(function(e)
//     {

//         var keynum;
//         if(window.event)
//         { // IE
//             keynum = e.keyCode;
//         }
//         else if(e.which)
//         {
//           // Netscape/Firefox/Opera
//           keynum = e.which;
//         }

//         if (String.fromCharCode(keynum) === " ") {
//           if (!playing) {
//             $('#localVideo')[0].play();
//           } else {
//             $('#localVideo')[0].pause();
//           }
//           playing = !playing;
//         }
//         //var unicode=e.keyCode? e.keyCode : e.charCode;
//         //alert(unicode);
//     });
