import { default as System } from '@core/system';

export default class RenderSystem extends System {
    constructor() {
      super()
    }
  
    work() {
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
        canvasCtx.arc(renderable.getXPosition(), renderable.getYPosition(), renderable.getWidth(), 0, 2 * Math.PI, false);
        canvasCtx.fill();
        canvasCtx.stroke();
      });
    };
  }
  