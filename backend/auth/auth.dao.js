const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
  create: function (data) {
    const user = new this(data);
    return user.save();
  },
  login: function (query) {
    return this.find(query);
  },
  getUsers: function (query, callback) {
    return this.find(query, callback);
  }
};

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;
