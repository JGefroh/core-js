import { default as Core } from '@core/core'

export default class System {
  constructor() {
    this.isStarted = false;
    this._core = Core;
  }
  
  start() {
    isStarted = true;
  };

  stop() {
    isStarted = false;
  };

  work() {
  };

  forTaggedAs(tag, callback) {
    var entities = this._core.getTaggedAs(tag);
    for (var index = 0; index < entities.length; index++) {
      callback(entities[index]);
    }
  };

  getTag(tagType) {
    return this._core.getTag(tagType);
  };

  send(messageType, payload) {
    this._core.send(messageType, payload);
  };

  addHandler(messageType, handler) {
    this._core.addHandler(messageType, handler);
  };
}
