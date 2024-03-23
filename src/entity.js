export default class Entity {
  constructor() {
    this.componentsByType = {}
    this.dirty = false;
    this.id = null;
  }

  getComponent(componentType) {
    return this.componentsByType[componentType];
  }

  hasChanged() {
    return this.dirty;
  }

  markChanged(isDirty) {
    this.dirty = isDirty;
  }

  setId(newId) {
    this.id = newId;
  }

  getId() {
    return this.id;
  }

  hasComponent(componentType) {
    return this.componentsByType[componentType];
  }

  addComponent(component) {
    this.componentsByType[component.getComponentType()] = component;
    this.markChanged(true);
  }

  removeComponent(component) {
    this.componentsByType[component.getComponentType()] = undefined;
    this.markChanged(true);
  }
}