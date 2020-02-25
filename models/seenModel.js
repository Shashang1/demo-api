const mongoose = require('mongoose')
const schema = mongoose.Schema;

var seenSchema = new schema({
  userId:{type:schema.Types.ObjectId, required:true},
  seen:{type:Array}
})

var seenModel = mongoose.model("seenModel", seenSchema, "seen")

module.exports = seenModel;