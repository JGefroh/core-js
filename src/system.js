function System() {
  var isStarted = false;
  var _core;

  this.setCore = function(core) {
    _core = core;
  };

  this.start = function() {
    isStarted = true;
  };

  this.stop = function() {
    isStarted = false;
  };

  this.work = function() {
  };

  this.forTaggedAs = function(tag, callback) {
    var entities = _core.getTaggedAs(tag);
    for (var index = 0; index < entities.length; index++) {
      callback(entities[index]);
    }
  };

  this.getTag = function(tagType) {
    return _core.getTag(tagType);
  };
}
