class Core {
  constructor() {
    this.systems;
    this.entitiesById;
    this.lastAssignedId;
    this.timer;
    this.timeLastChecked;
    this.entitiesByTag;
    this.knownTags;
    this.workInterval;
    this.isPaused;
    this.handlersByMessageType;
    this.desiredFPS = 60;

    this.systems = [];
    this.entitiesById = {};
    this.entitiesByTag = {};
    this.lastAssignedId = 0;
    this.knownTags = {};
    this.handlersByMessageType = {};
  }

  addEntity(entity) {
    if (!entity || this.isTracked(entity)) {
      return;
    }

    if (!entity.getId()) {
      entity.setId(this.generateId());
    }

    this.entitiesById[entity.getId()] = entity;
    this.updateTags(entity);
  }

  isTracked(entity) {
    return entity && entity.getId() && this.entitiesById[entity.getId()];
  }

  generateId() {
    return ++this.lastAssignedId;
  }

  updateTags(entity) {
    if (!entity) {
      return;
    }
    console.info(this.knownTags);

    this.tagTypes = Object.keys(this.knownTags);
    let tags = this.tagTypes.map((tagType) => {
      return this.knownTags[tagType];
    });


    for (let index = 0; index < tags.length; index++) {
      let tag = tags[index];
      if (tag.isAssignableTo(entity)) {
        this.assignTag(entity, tag);
      }
      else {
        this.unassignTag(entity, tag);
      }
    }
  }

  assignTag(entity, tag) {
    let entities = this.entitiesByTag[tag.getTagType()];
    if (!entities) {
      this.entitiesByTag[tag.getTagType()] = [];
      entities = this.entitiesByTag[tag.getTagType()];
    }
    let isAlreadyAssigned = false;
    for (let index = 0; index < entities.length; index++) {
      if (entities[index].getId() === entity.getId()) {
        isAlreadyAssigned = true;
        break;
      }
    }

    if (!isAlreadyAssigned) {
      entities.push(entity);
    }
  }

  unassignTag(entity, tag) {
    this.entities = this.entitiesByTag[tag.getTagType()];
    if (!entities) {
      return;
    }

    for (let index = 0; index < this.entities.length; index++) {
      if (this.entities[index].getId() === entity.getId()) {
        entityIndex = index;
      }
    }

    if (entityIndex) {
      this.entities.splice(entityIndex, 1);
    }
  }

  removeEntity(entity) {
    if (!entity) {
      return;
    }
    entity.removeAllComponents();
    this.updateTags(entity);
    this.entitiesById[entity.getId()] = undefined;
  }

  addSystem(system) {
    this.systems.push(system);
  }

  removeSystem(system) {
    this.systems.splice(this.systems.indexOf(system), 1);
  }

  work() {
    this.t1 = performance.now();
    this.updateTimer();
    this.syncChangedEntities();
    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i].work();
    }
    this.t2 = performance.now();
  }

  syncChangedEntities() {
    let ids = Object.keys(this.entitiesById);
    this.entities = ids.map((id) => {
      return this.entitiesById[id];
    });

    for (let index = 0; index < this.entities.length; index++) {
      let entity = this.entities[index];
      if (entity.hasChanged()) {
        this.updateTags(entity);
        entity.markChanged(false);
      }
    }
  }

  getTag(tagType) {
    return this.knownTags[tagType];
  }

  now() {
    return timer / 1000000;
  }

  updateTimer() {
    this.now = performance.now();
    if (!this.isPaused) {
      this.timePassed =  this.now - this.timeLastChecked;
      this.timer += this.timePassed;
    }
    this.timeLastChecked = this.now;
  }

  start() {
    window.setTimeout(() => {
      this.work();
      this.start();
    }, 1000 / this.desiredFPS);
  }

  stop() {
    clearInterval(this.workInterval);
  }

  getTaggedAs(tag) {
    return this.entitiesByTag[tag] || [];
  }

  addTag(tag) {
    if (tag && !this.knownTags[tag.getTagType()]) {
      this.knownTags[tag.getTagType()] = tag;
    }
  }

  send(messageType, payload) {
    let handlersForMessage = this.handlersByMessageType[messageType];
    if (handlersForMessage) {
      for (let index = 0; index < handlersForMessage.length; index++) {
        handlersForMessage[index](payload);
      }
    }
  }

  addHandler(messageType, handler) {
    let handlersForMessage = this.handlersByMessageType[messageType];
    if (!handlersForMessage) {
      this.handlersByMessageType[messageType] = [];
      handlersForMessage = this.handlersByMessageType[messageType];
    }
    if (handlersForMessage.indexOf(handler) === -1) {
      handlersForMessage.push(handler);
    }
  }
}

export default new Core()