const mongoose = require('mongoose')
const schema = mongoose.Schema

const logSchema = new schema({
  log:{type:Array}
})

const logModel = mongoose.model("logModel", logSchema, "log")

module.exports = logModel;
