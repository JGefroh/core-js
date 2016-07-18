(function() {
  'use strict';
})();

function InputSystem(core) {
  System.call(this, core);
  var self = this;
  var keymap = {
    65: 'stop_left',
    97: 'move_left',
    119: 'move_up',
    87: 'stop_up',
    100: 'move_right',
    68: 'stop_right',
    115: 'move_down',
    83: 'stop_down'
  };

  window.onkeypress = function(event) {
    event.stopPropagation();
    event.preventDefault();
    fireAppropriateEvent(event);

  };

  window.onkeyup = function(event) {
    event.stopPropagation();
    event.preventDefault();
    fireAppropriateEvent(event);
  };

  function fireAppropriateEvent(event, eventType) {
    var action = keymap[event.keyCode];
    if (action) {
      self.send('INPUT_RECEIVED', action);
    }
  }
}

function MovementSystem(core) {
  System.call(this, core);
  var reverse = false;
  var xVelocity = 0;
  var yVelocity = 0;

  this.addHandler('INPUT_RECEIVED', function(message) {
    if (message === 'stop_left' || message === 'stop_right') {
      xVelocity = 0;
    }
    else if (message === 'stop_up' || message === 'stop_down') {
      yVelocity = 0;
    }

    if (message === 'move_left') {
      xVelocity = -3;
    }
    else if (message === 'move_right') {
      xVelocity = 3;
    }
    else if (message === 'move_down') {
      yVelocity = -3;
    }
    else if (message === 'move_up') {
      yVelocity = 3;
    }
  });

  this.work = function() {
    var movable = this.getTag('Movable');
    this.forTaggedAs('Movable', function(entity) {
      movable.setEntity(entity);
      movable.setXPos(movable.getXPos() + xVelocity);
      movable.setYPos(movable.getYPos() - yVelocity);
    });
  };
}

function DotSpawnSystem(core) {
  System.call(this, core);
}

function RenderSystem(core) {
  System.call(this, core);

  this.work = function() {
    var renderable = this.getTag('Renderable');
    var canvasCtx = document.getElementById('canvas').getContext("2d");
    canvasCtx.canvas.width  = window.innerWidth;
    canvasCtx.canvas.height = window.innerHeight;
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
