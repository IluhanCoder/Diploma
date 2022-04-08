module.exports = class EventDto {
  name;
  creatorId;
  creatorName;
  desc;
  genres;
  date;
  adress;
  participants;
  avatar;
  songs;
  isSubmited;

  constructor(model) {
    this.name = model.name;
    this.creatorId = model.creatorId;
    this.desc = model.birthday;
    this.cell = model.cell;
    this.city = model.city;
    this.gender = model.gender;
    this.avatar = model.avatar;
    this._id = model._id;
    this.isActivated = model.isActivated;
  }
};
