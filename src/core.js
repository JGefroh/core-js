function Core() {
  var systems;
  var entitiesById;
  var lastAssignedId;
  var timer;
  var timeLastChecked;
  var entitiesByTag;
  var knownTags;
  var workInterval;
  var isPaused;
  var handlersByMessageType;


  function initialize() {
    systems = [];
    entitiesById = {};
    entitiesByTag = {};
    lastAssignedId = 0;
    knownTags = [];
    handlersByMessageType = {};
  }

  function addEntity(entity) {
    if (!entity || isTracked(entity)) {
      return;
    }

    if (!entity.getId()) {
      entity.setId(generateId());
    }

    entitiesById[entity.getId()] = entity;
    updateTags(entity);
  }

  function isTracked(entity) {
    return entity && entity.getId() && entitiesById[entity.getId()];
  }

  function generateId() {
    return ++lastAssignedId;
  }

  function updateTags(entity) {
    if (!entity) {
      return;
    }

    var tagTypes = Object.keys(knownTags);
    var tags = tagTypes.map(function(tagType) {
      return knownTags[tagType];
    });


    for (var index = 0; index < tags.length; index++) {
      var tag = tags[index];
      if (tag.isAssignableTo(entity)) {
        assignTag(entity, tag);
      }
      else {
        unassignTag(entity, tag);
      }
    }
  }

  function assignTag(entity, tag) {
    var entities = entitiesByTag[tag.getTagType()];
    if (!entities) {
      entitiesByTag[tag.getTagType()] = [];
      entities = entitiesByTag[tag.getTagType()];
    }
    var isAlreadyAssigned = false;
    for (var index = 0; index < entities.length; index++) {
      if (entities[index].getId() === entity.getId()) {
        isAlreadyAssigned = true;
        break;
      }
    }

    if (!isAlreadyAssigned) {
      entities.push(entity);
    }
  }

  function unassignTag(entity, tag) {
    var entities = entitiesByTag[tag.getTagType()];
    if (!entities) {
      return;
    }

    for (var index = 0; index < entities.length; index++) {
      if (entities[index].getId() === entity.getId()) {
        entityIndex = index;
      }
    }

    if (entityIndex) {
      entities.splice(entityIndex, 1);
    }
  }

  function removeEntity(entity) {
    if (!entity) {
      return;
    }
    entity.removeAllComponents();
    updateTags(entity);
    entitiesById[entity.getId()] = undefined;
  }

  function addSystem(system) {
    systems.push(system);
  }

  function removeSystem(system) {
    systems.splice(systems.indexOf(system), 1);
  }

  function work() {
    updateTimer();
    syncChangedEntities();
    for (var i = 0; i < systems.length; i++) {
      systems[i].work();
    }
  }

  function syncChangedEntities() {
    var ids = Object.keys(entitiesById);
    var entities = ids.map(function(id) {
      return entitiesById[id];
    });

    for (var index = 0; index < entities.length; index++) {
      var entity = entities[index];
      if (entity.hasChanged()) {
        updateTags(entity);
        entity.markChanged(false);
      }
    }
  }

  function getTag(tagType) {
    return knownTags[tagType];
  }

  function now() {
    return timer / 1000000;
  }

  function updateTimer() {
    var now = window.performance.now();
    if (!isPaused) {
      var timePassed =  now - timeLastChecked;
      timer += timePassed;
    }
    timeLastChecked = now;
  }

  function start() {
    workInterval = window.setInterval(work, 16);
  }
  function stop() {
    clearInterval(workInterval);
  }

  function getTaggedAs(tag) {
    return entitiesByTag[tag] || [];
  }

  function addTag(tag) {
    if (tag && !knownTags[tag.getTagType()]) {
      knownTags[tag.getTagType()] = tag;
    }
  }

  function send(messageType, payload) {
    var handlersForMessage = handlersByMessageType[messageType];
    if (handlersForMessage) {
      for (var index = 0; index < handlersForMessage.length; index++) {
        handlersForMessage[index](payload);
      }
    }
  }

  function addHandler(messageType, handler) {
    var handlersForMessage = handlersByMessageType[messageType];
    if (!handlersForMessage) {
      handlersByMessageType[messageType] = [];
      handlersForMessage = handlersByMessageType[messageType];
    }
    if (handlersForMessage.indexOf(handler) === -1) {
      handlersForMessage.push(handler);
    }
  }

  initialize();

  return {
    addEntity: addEntity,
    addSystem: addSystem,
    addTag: addTag,
    start: start,
    stop: stop,
    getTaggedAs: getTaggedAs,
    getTag: getTag,
    send: send,
    addHandler: addHandler
  };
}
