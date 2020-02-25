var mongoose = require('mongoose')
var schema = mongoose.Schema;


var historySchema = new schema({
  userId:{type:schema.Types.ObjectId, required:true, unique:true},
  loginHistory:{type:Array},
  logoutHistory:{type:Array}
})
var historyModel = mongoose.model("historyModel", historySchema, "history")

module.exports = historyModel;
