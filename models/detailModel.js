var mongoose = require("mongoose")
var schema = mongoose.Schema;

var detailSchema = new schema({
  username:{type:String, requried:true},
  userId:{type:schema.Types.ObjectId, requried: true, unique:true},
  fname:{type:String, requried:true},
  lname:{type:String, requried:true},
  worksAt:{type:String, require:true},
  position:{type:String ,requried:true},
  mode:{type:String, required:true},
  image:{type:String}
})
var detailModel = mongoose.model("detailModel", detailSchema, "details")

module.exports = detailModel;

