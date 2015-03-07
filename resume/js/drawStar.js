var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight*getPartCount();
var hh = h >= 300 ? h :300;

var canvas = document.getElementById("starCanvas");
canvas.width = w;
canvas.height = hh;
var context = canvas.getContext("2d");
var starArr = [];
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
for (var i = 0; i < 10*getPartCount(); i++) {
    var starObj = {
        radius1 : 3+3*Math.random(),
        radius2 : 1+1*Math.random(),
        x : 6+(canvas.width-12)*Math.random(),
        y : 6+(canvas.height-12)*Math.random(),
        num : Math.ceil(3+2*Math.random()),
        // color : "rgb("+parseInt(255*Math.random())+","+parseInt(255*Math.random())+","+parseInt(255*Math.random())+")",
        color : "rgb(255,255,255)",
        angle : 360*Math.random(),
        changeAngle : 2
    }
    starArr.push(starObj);
};

function getPartCount(){
    var lis=document.querySelectorAll('#scroller>section');
    return lis.length;
}
function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < starArr.length; i++) {
        starArr[i].angle+=starArr[i].changeAngle;
        context.save();
        context.beginPath();
        context.translate(starArr[i].x,starArr[i].y);
        context.rotate(starArr[i].angle*Math.PI/180);
        context.scale(Math.sin(starArr[i].angle*Math.PI/180),Math.sin(starArr[i].angle*Math.PI/180));
        //context.globalAlpha = Math.abs(Math.sin(starArr[i].angle*Math.PI/180));
        drawStar(0,0,starArr[i].radius1,starArr[i].radius2,starArr[i].num,"fill",starArr[i].color);
        context.restore();
    };
    //requestAnimFrame(animate);
};
animate();


function drawStar(x,y,radius1,radius2,num,drawType,color) {
    var angle = 360/(num*2);
    var arr = [];
    for (var i = 0; i < num*2; i++) {
        var starObj = {};
        if (i%2 == 0) {
            starObj.x = x+radius1*Math.cos(i*angle*Math.PI/180);
            starObj.y = y+radius1*Math.sin(i*angle*Math.PI/180);
        }else {
            starObj.x = x+radius2*Math.cos(i*angle*Math.PI/180);
            starObj.y = y+radius2*Math.sin(i*angle*Math.PI/180);
        };
        arr.push(starObj);
    }
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = color;
    context.moveTo(arr[0].x,arr[0].y);
    for (var i = 0; i < arr.length; i++) {
        context.lineTo(arr[i].x,arr[i].y);
    };
    context.closePath();
    if (drawType == "fill") {
        context.fill();
    }else {
        context.stroke();
    };
}