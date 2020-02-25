var mongoose = require("mongoose")
var schema = mongoose.Schema;

var userSchema = new schema({
  username:{type:String, unique:true, trim:true, requried:true},
  password:{type:String, trim:true, requried:true}
})
var userModel = mongoose.model("userModel", userSchema, "user")

module.exports = userModel;