function Renderable() {
  Tag.call(this, 'Renderable');

  this.isAssignableTo = function(entity) {
    return entity.has('RenderComponent');
  };


  this.getXPos = function() {
    return this.entity.getComponent('PositionComponent').xPos;
  };

  this.getYPos = function() {
    return this.entity.getComponent('PositionComponent').yPos;
  };

  this.getWidth = function() {
    return this.entity.getComponent('RenderComponent').width;
  };
}

function Moveable() {
  Tag.call(this, 'Movable');
  this.isAssignableTo = function(entity) {
    return entity.has('PositionComponent');
  };

  this.setXPos = function(xPos) {
    this.entity.getComponent('PositionComponent').xPos = xPos;
  };

  this.getXPos = function() {
    return this.entity.getComponent('PositionComponent').xPos;
  };

  this.setYPos = function(yPos) {
    this.entity.getComponent('PositionComponent').yPos = yPos;
  };

  this.getYPos = function() {
    return this.entity.getComponent('PositionComponent').yPos;
  };
}
