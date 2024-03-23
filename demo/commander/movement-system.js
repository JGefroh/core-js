import { default as System } from '@core/system';

export default class MovementSystem extends System {
    constructor() {
      super();
      this.reverse = false;
      this.xVelocity = 0;
      this.yVelocity = 0;

      this.addHandler('INPUT_RECEIVED', (message) => {
        if (message === 'stop_left' || message === 'stop_right') {
          this.xVelocity = 0;
        }
        else if (message === 'stop_up' || message === 'stop_down') {
          this.yVelocity = 0;
        }
    
        if (message === 'move_left') {
          this.xVelocity = -3;
        }
        else if (message === 'move_right') {
          this.xVelocity = 3;
        }
        else if (message === 'move_down') {
          this.yVelocity = -3;
        }
        else if (message === 'move_up') {
          this.yVelocity = 3;
        }
      });
    
    }
    
    work() {
      var movable = this.getTag('Movable');
      this.forTaggedAs('Movable', (entity) => {
        movable.setEntity(entity);
        movable.setXPosition(movable.getXPosition() + this.xVelocity);
        movable.setYPosition(movable.getYPosition() - this.yVelocity);
      });
    };
  }