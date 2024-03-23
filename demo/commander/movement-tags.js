import { default as Tag } from '@core/tag'

export default class Moveable extends Tag{
    constructor() {
        super()
        this.tagType = 'Movable'
    }

    isAssignableTo(entity) {
      return entity.hasComponent('PositionComponent');
    };
  
    setXPosition(xPosition) {
      this.entity.getComponent('PositionComponent').xPosition = xPosition;
    };
  
    getXPosition() {
      return this.entity.getComponent('PositionComponent').xPosition;
    };
  
    setYPosition(yPosition) {
        this.entity.getComponent('PositionComponent').yPosition = yPosition;
    };
  
    getYPosition() {
      return this.entity.getComponent('PositionComponent').yPosition;
    };
  }
  