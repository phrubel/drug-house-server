const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  number:{
    type: String,
    required: true,
  },
  pharmacyName:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum : ['user','admin'],
    default:'user',
  },
  profile_pic:{
    type:String,
  },

  hased_password: {
    type: String,
    required: true,
  },
  verify_login_code: {
    type: String,
  },
  salt: String,
  resetPasswordLink: {
    type: String,
    default: "",
  },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hased_password = this.encryptedPassword(password);
  })
  .get(function () {
    return this._password;
  });

  userSchema.methods = {
    authenticate: function (plainText) {
      return this.encryptedPassword(plainText) === this.hased_password;
    },
    encryptedPassword: function (password) {
      if (!password) return "";
      try {
        return crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
      } catch (e) {
        return "";
      }
    },
    makeSalt: function () {
      return Number(Math.random(new Date().valueOf() * Math.random()));
    },
  };

  
  module.exports = mongoose.model("User", userSchema);