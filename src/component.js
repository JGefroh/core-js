function Component(typeName) {
  var id = null;
  var componentType = typeName;

  this.getId = function() {
    return this.id;
  };

  this.setId = function(id) {
    this.id = id;
  };

  this.getComponentType = function() {
    return componentType;
  };
}
