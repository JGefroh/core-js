function Entity() {
  var componentsByType = {};
  var dirty;
  var id;
  function getComponent(componentType) {
    return componentsByType[componentType];
  }

  function hasChanged() {
    return dirty;
  }

  function markChanged(isDirty) {
    dirty = isDirty;
  }

  function setId(newId) {
    id = newId;
  }

  function getId() {
    return id;
  }

  function hasComponent(componentType) {
    return componentsByType[componentType];
  }

  function addComponent(component) {
    componentsByType[component.getComponentType()] = component;
    markChanged(true);
  }

  function removeComponent(component) {
    componentsByType[component.getComponentType()] = undefined;
    markChanged(true);
  }

  return {
    getComponent: getComponent,
    hasChanged: hasChanged,
    setId: setId,
    getId: getId,
    add: addComponent,
    remove: removeComponent,
    has: hasComponent,
    markChanged: markChanged
  };
}
