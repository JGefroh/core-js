function Tag(tagName) {
  var id;
  var tagType = tagName;
  var entity;
  this.getId = function() {
    return this.id;
  };

  this.setId = function(id) {
    this.id = id;
  };

  this.isAssignableTo = function(entity) {
  };

  this.setEntity = function(entity) {
    this.entity = entity;
  };

  this.getTagType = function() {
    return tagType;
  };
}
