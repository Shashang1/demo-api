var mongoose = require("mongoose")
var schema = mongoose.Schema;

var userSchema = new schema({
  username:{type:String, unique:true, trim:true, requried:true},
  password:{type:String, trim:true, requried:true}
})

var detailSchema = new schema({
  username:{type:String, requried:true},
  userId:{type:schema.Types.ObjectId, requried: true, unique:true},
  fname:{type:String, requried:true},
  lname:{type:String, requried:true},
  worksAt:{type:String, require:true},
  position:{type:String ,requried:true},
  mode:{type:String, required:true},
})

var historySchema = new schema({
  userId:{type:schema.Types.ObjectId, required:true, unique:true},
  loginHistory:{type:Array},
  logoutHistory:{type:Array}
})

var modeSchema = new schema({
  userId:{type: schema.Types.ObjectId, required:true, unique:true},
  mode:{type:String, required:true}
})

var seenSchema = new schema({
  userId:{type:schema.Types.ObjectId, required:true},
  seen:{type:Array}
})

var imageSchema = new schema({
  userId:{type:schema.Types.ObjectId, requried:true},
  image:{type:String}
})

var userModel = mongoose.model("userModel", userSchema, "user")
var detailModel = mongoose.model("detailModel", detailSchema, "details")
var historyModel = mongoose.model("historyModel", historySchema, "history")
var modeModel = mongoose.model("modeModel", modeSchema, "mode")
var seenModel = mongoose.model("seenModel", seenSchema, "seen")
var imageModel = mongoose.model("imageModel", imageSchema, "image")

module.exports = {userModel, detailModel, historyModel, modeModel, seenModel, imageModel};