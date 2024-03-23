import { default as System } from '@core/system';

export default class InputSystem extends System {
    constructor() {
        super();
        let self = this;
        let keymap = {
            65: 'stop_left',
            97: 'move_left',
            119: 'move_up',
            87: 'stop_up',
            100: 'move_right',
            68: 'stop_right',
            115: 'move_down',
            83: 'stop_down'
        };

        let fireAppropriateEvent = (event, eventType) => {
            var action = keymap[event.keyCode];
            if (action) {
              self.send('INPUT_RECEIVED', action);
            }
        }

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
    }
  }