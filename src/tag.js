export default class Tag {
  constructor() {
    this.id;
    this.entity;
    this.tagType;
  }
  getId() {
    return this.id;
  };

  setId(id) {
    this.id = id;
  };

  isAssignableTo(entity) {
  };

  setEntity(entity) {
    this.entity = entity;
  };

  getTagType() {
    return this.tagType;
  };
}
