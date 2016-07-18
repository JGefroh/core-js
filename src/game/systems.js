(function() {
  'use strict';
})();


function MovementSystem(core) {
  System.call(this, core);
  var reverse = false;

  this.work = function() {
    var movable = this.getTag('Movable');
    this.forTaggedAs('Movable', function(entity) {
      movable.setEntity(entity);
      if (reverse) {
        movable.setXPos(movable.getXPos() - 1);
        movable.setYPos(movable.getYPos() - 1);
        if (movable.getXPos() < 0) {
          reverse = false;
        }
      }
      else {
        movable.setXPos(movable.getXPos() + 1);
        movable.setYPos(movable.getYPos() + 1);
        if (movable.getXPos() > 150) {
          reverse = true;
        }
      }
    });
  };
}

function RenderSystem(core) {
  System.call(this, core);

  this.work = function() {
    var renderable = this.getTag('Renderable');
    var canvasCtx = document.getElementById('canvas').getContext("2d");
    canvasCtx.save();
    canvasCtx.fillStyle = "#FFFFFF";
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    canvasCtx.restore();
    this.forTaggedAs('Renderable', function(entity) {
      renderable.setEntity(entity);
      canvasCtx.strokeStyle = "#000000";
      canvasCtx.beginPath();
      canvasCtx.arc(renderable.getXPos(), renderable.getYPos(), renderable.getWidth(), 0, 2 * Math.PI, false);
      canvasCtx.fill();
      canvasCtx.stroke();
    });
  };
}
