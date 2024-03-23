import { default as Tag } from '@core/tag'

export default class Renderable extends Tag {
    constructor() {
      super();
      this.tagType = 'Renderable'
    }

    isAssignableTo(entity) {
      return entity.hasComponent('RenderComponent');
    };
  
    getXPosition() {
      return this.entity.getComponent('PositionComponent').xPosition;
    };
  
    getYPosition() {
      return this.entity.getComponent('PositionComponent').yPosition;
    };
  
    getWidth() {
      return this.entity.getComponent('RenderComponent').width;
    };
  }
  